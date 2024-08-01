import prisma from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const productId = charge.metadata.product;
    const email = charge.metadata.email;
    const pricePaidInCents = charge.amount;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (product == null || email == null) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const userFields = {
      email: email,
      orders: {
        create: {
          productId: productId,
          pricePaidInCents: pricePaidInCents,
        },
      },
    };

    const {
      orders: [order],
    } = await prisma.user.upsert({
      where: {
        email: email,
      },
      create: userFields,
      update: userFields,
      select: {
        orders: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    const downloadVerification = await prisma.downloadVerification.create({
      data: {
        productId: productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Order Confirmation",
      react: <h1>Hi</h1>,
    });
  }

  return new NextResponse();
}
