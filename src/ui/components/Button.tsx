import { ComponentPropsWithoutRef } from "react";

export function Button({
  type,
  className,
  onClick,
  children,
  ...rest
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...rest}
      className={`py-2 px-10 rounded hover:cursor-pointer hover:scale-105 transition-all font-semibold shadow-md w-full sm:w-auto ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
