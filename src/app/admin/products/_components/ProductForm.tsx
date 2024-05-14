import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProductForm() {
  return (
    <form className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input type="number" id="priceInCents" name="priceInCents" required />
      </div>
    </form>
  );
}
