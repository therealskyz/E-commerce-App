import PageHeader from "@/app/admin/_components/PageHeader";
import ProductForm from "../../_components/ProductForm";
import prisma from "@/db/db";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params: { id } }: Props) {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
}
