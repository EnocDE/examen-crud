import { ReactNode } from "react";

export function FormFieldset({ children }: { children: ReactNode }) {
  return (
    <fieldset className="w-full flex flex-wrap gap-2">
      <>{children}</>
    </fieldset>
  );
}
