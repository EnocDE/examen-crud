import { ReactNode } from "react";

export function FormLegend({ children }: { children: ReactNode }) {
  return (
    <legend className="font-bold text-xl mb-2 text-gray-800">{children}</legend>
  );
}
