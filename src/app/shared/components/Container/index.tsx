import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-7xl mx-auto px-6 py-10">{children}</div>;
}
