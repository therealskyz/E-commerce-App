"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteProduct, toggleProductAvailability } from "../_actions/products";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface ActiveToggleProps {
  id: string;
  isAvailableForPurchase: boolean;
}

interface DeleteDropdownItemProps {
  id: string;
  disabled: boolean;
}

export function ActiveToggleDropdownItem({
  id,
  isAvailableForPurchase,
}: ActiveToggleProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase);
          router.refresh();
        });
      }}
    >
      {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
}

export function DeleteDropdownItem({ id, disabled }: DeleteDropdownItemProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
