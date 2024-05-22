import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { toggleProductAvailability } from "../../_actions/products";

interface Props {
  id: string;
  isAvailableForPurchase: boolean;
}

export function ActiveToggleDropdownItem({
  id,
  isAvailableForPurchase,
}: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase);
        });
      }}
    >
      {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
}
