import prisma from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

interface DownloadVerification {
  params: {
    downloadVerificationId: string;
  };
}
export async function GET(
  req: NextRequest,
  { params: { downloadVerificationId } }: DownloadVerification
) {
  const data = await prisma.downloadVerification.findUnique({
    where: {
      id: downloadVerificationId,
      expiresAt: {
        gt: new Date(),
      },
    },
    select: {
      product: {
        select: {
          filePath: true,
          name: true,
        },
      },
    },
  });

  if (data == null) {
    return new NextResponse
  }
  return new NextResponse("Hi");
}
