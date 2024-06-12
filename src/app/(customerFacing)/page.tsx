import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import prisma from "@/db/db";
import { cache } from "@/lib/cache";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const getMostPopularProducts = cache(
  () => {
    return prisma.product.findMany({
      where: {
        isAvailableForPurchase: true,
      },
      orderBy: {
        order: {
          _count: "desc",
        },
      },
      take: 6,
    });
  },
  ["/", "getMostPopularProducts"], // unique identifier for each database call.
  { revalidate: 60 * 60 * 24 } // every 24hrs it will invalidate the cache and get a new value for it.
);

const getNewestProducts = cache(() => {
  return prisma.product.findMany({
    where: {
      isAvailableForPurchase: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}, ["/", "getNewestProducts"]);

interface ProductGridSectionProps {
  title: string;
  productsFetcher: () => Promise<Product[]>;
}

async function ProductGridSection({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3x1 font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(await productsFetcher()).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="space-y-12">
      <ProductGridSection
        title="Most Popular"
        productsFetcher={getMostPopularProducts}
      />
      <ProductGridSection title="Newest" productsFetcher={getNewestProducts} />
    </main>
  );
}
