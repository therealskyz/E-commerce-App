"use client";

import { formatCurrency } from "@/lib/formatter";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";

interface Props {
  product: {
    imagePath: string;
    name: string;
    priceInCents: number;
    description: string;
  };
  clientSecret: string;
}

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default function CheckoutForm({ product, clientSecret }: Props) {
  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image src={product.imagePath} fill alt={product.name} />
        </div>
        <div>
          <div>{formatCurrency(product.priceInCents / 100)}</div>
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={stripe}>
        <Form />
      </Elements>
    </div>
  );
}

function Form() {
  const stripe = useStripe();
  const elements = useElements();

  return <PaymentElement />;
}
