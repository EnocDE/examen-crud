import { ComponentPropsWithoutRef } from "react";

export function Title({
  children,
  className,
}: ComponentPropsWithoutRef<"title">) {
  return (
    <h1 className={`p-5 text-center text-4xl font-bold ${className}`}>
      {children}
    </h1>
  );
}
