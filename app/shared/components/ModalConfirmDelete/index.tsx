"use client";

import { Modal } from "../Modal";
import { Button } from "../Button";
import { Trash2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName?: string;
}

export function ModalConfirmDelete({
  open,
  onClose,
  onConfirm,
  productName,
}: Props) {
  return (
    <Modal open={open} onClose={onClose} title="Remover produto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 text-red-400">
          <Trash2 />
          <p className="font-medium">
            Deseja remover{" "}
            <span className="font-bold text-white">{productName}</span> ?
          </p>
        </div>

        <p className="text-sm text-zinc-400">
          Essa ação não pode ser desfeita.
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Remover
          </Button>
        </div>
      </div>
    </Modal>
  );
}
