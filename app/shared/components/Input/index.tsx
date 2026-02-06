import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-sm font-medium text-zinc-700">{label}</label>
        )}

        <input
          ref={ref}
          className={clsx(
            "border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black",
            error && "border-red-500",
            className,
          )}
          {...props}
        />

        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
