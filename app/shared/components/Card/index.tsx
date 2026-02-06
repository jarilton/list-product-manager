import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-800 rounded-2xl border shadow-sm p-4">
      {children}
    </div>
  );
}
