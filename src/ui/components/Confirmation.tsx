import { ReactNode } from "react";

interface ConfirmationProps {
  children: ReactNode;
  label: string;
}

export function Confirmation({ children, label }: ConfirmationProps) {
  return (
    <div className="fixed overflow-hidden inset-0 h-screen bg-black/50 flex justify-center items-center">
      <div className="p-10 bg-white rounded-xl flex flex-col gap-5 m-5">
        <p className="text-2xl font-bold text-center">{label}</p>
        <div className="flex gap-5 flex-col sm:flex-row">{children}</div>
      </div>
    </div>
  );
}
