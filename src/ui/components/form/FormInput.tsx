import { ComponentPropsWithoutRef } from "react";

type FormInputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
};

export function FormInput(props: FormInputProps) {
  const { id, className, label, ...rest } = props;

  return (
    <div className="flex flex-col sm:flex-1/4 w-full">
      <label
        htmlFor={id}
        className="font-medium text-gray-600"
      >
        {label}
      </label>
      <input
        {...rest}
        className={`p-2 border border-slate-400 rounded w-full ${className}`}
      />
    </div>
  );
}
