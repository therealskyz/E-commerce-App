import { ProductCard } from "@/components/ProductCard";
import prisma from "@/db/db";
import { cache } from "@/lib/cache";

const getProducts = cache(() => {
  return prisma.product.findMany({
    where: {
      isAvailableForPurchase: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}, ["/products", "getProducts"]);

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {(await getProducts()).map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
