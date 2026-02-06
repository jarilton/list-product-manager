import { useState } from "react";
import { Modal } from "@/app/shared/components/Modal";
import { Input } from "@/app/shared/components/Input";
import { Button } from "@/app/shared/components/Button";
import { z } from "zod";
import toast from "react-hot-toast";
import { productSchema } from "@/app/features/products/schemas/productSchema";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: z.infer<typeof productSchema>) => void;
  editing?: z.infer<typeof productSchema> & { id: string };
}

const emptyForm = {
  name: "",
  category: "",
  price: "",
  description: "",
  imageUrl: "",
};

export function ModalProduct({ open, onClose, onSave, editing }: Props) {
  const [form, setForm] = useState(() => {
    if (editing) {
      return {
        name: editing.name ?? "",
        category: editing.category ?? "",
        price: editing.price ?? "",
        description: editing.description ?? "",
        imageUrl: editing.imageUrl ?? "",
      };
    }
    return emptyForm;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleClose() {
    setForm(emptyForm);
    setErrors({});
    onClose();
  }

  function handleSave() {
    try {
      setErrors({});

      const parsed = productSchema.parse({
        ...form,
        price: form.price === "" ? 0 : Number(form.price),
      });

      onSave(parsed);
      handleClose();

      toast.success(editing ? "Produto atualizado" : "Produto criado");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const e: Record<string, string> = {};

        err.issues.forEach((i) => {
          if (i.path[0]) e[i.path[0] as string] = i.message;
        });

        setErrors(e);
      }
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={editing ? "Editar produto" : "Novo produto"}
    >
      <div className="grid gap-3">
        <Input
          placeholder="Nome"
          value={form.name}
          error={errors.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <Input
          placeholder="Categoria"
          value={form.category}
          error={errors.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <Input
          placeholder="Preço"
          type="number"
          value={form.price}
          error={errors.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <Input
          placeholder="URL imagem"
          value={form.imageUrl}
          error={errors.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />

        <Input
          placeholder="Descrição"
          value={form.description}
          error={errors.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <Button variant="danger" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleSave}>
          Salvar
        </Button>
      </div>
    </Modal>
  );
}
