import { ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export function Modal({ open, onClose, children, title }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-xl">
        {title && (
          <h2 className="text-xl font-bold mb-4 text-gray-200">{title}</h2>
        )}

        {children}
      </div>
    </div>
  );
}
