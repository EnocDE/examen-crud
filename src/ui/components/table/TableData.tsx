import { ComponentPropsWithoutRef } from "react";

export function TableData({
  className,
  children,
}: ComponentPropsWithoutRef<"td">) {
  return (
    <td className={`p-2 border border-slate-400/20 ${className}`}>
      {children}
    </td>
  );
}
