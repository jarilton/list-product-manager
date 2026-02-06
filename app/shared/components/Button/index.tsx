import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  loading,
  className,
  children,
  ...props
}: Props) {
  const base =
    "px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center justify-center";

  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800",
    secondary: "bg-zinc-200 hover:bg-zinc-300 text-black",
    ghost: "hover:bg-zinc-100 text-black",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      disabled={loading}
      {...props}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
}
