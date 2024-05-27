import { formatCurrency } from "@/lib/formatter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

interface Props {
  name: string;
  priceInCents: number;
  description: string;
  id: string;
  imagePath: string;
}

export function ProductCard({
  name,
  priceInCents,
  description,
  id,
  imagePath,
}: Props) {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-video">
        <Image src={imagePath} fill alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button>
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
