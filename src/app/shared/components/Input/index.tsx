import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import { Search } from "lucide-react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: "search";
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-sm font-medium text-zinc-700">{label}</label>
        )}

        <div className="relative w-full">
          {icon === "search" && (
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
          )}

          <input
            ref={ref}
            className={clsx(
              "bg-gray-800 border rounded-xl h-10 text-sm outline-none focus:ring-2 focus:ring-black w-full",
              icon === "search" && "pl-9 pr-3",
              !icon && "px-3",
              error && "border-red-500 focus:ring-red-500",
              className,
            )}
            {...props}
          />
        </div>

        {error && (
          <span className="text-xs text-red-500 font-medium">{error}</span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
