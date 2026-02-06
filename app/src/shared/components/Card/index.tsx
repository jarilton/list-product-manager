import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-4">{children}</div>
  );
}
