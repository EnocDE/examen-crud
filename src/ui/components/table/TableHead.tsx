import { ComponentPropsWithoutRef } from "react";

export function TableHead({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      {...rest}
      className={`p-2 border border-slate-400/20 text-xl text-slate-800 ${className}`}
    >
      {children}
    </th>
  );
}
