import prisma from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params: { id } }: Props) {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      filePath: true,
      name: true,
    },
  });

  if (product == null) return notFound();

  const { size } = await fs.stat(product.filePath);
  const file = await fs.readFile(product.filePath);
  const extension = product.filePath.split(".").pop();

  return new NextResponse(file, {
    headers: {
      "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
      "Content-Length": size.toString(),
    },
  });
}
