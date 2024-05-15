import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PageHeader({ children }: Props) {
  return <h1 className="text-4xl mb-4">{children}</h1>;
}
