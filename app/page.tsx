"use client";

import { useEffect, useState } from "react";
import { useProducts } from "./features/products/hooks/useProducts";
import { Container } from "./shared/components/Container";
import { Input } from "./shared/components/Input";
import { Button } from "./shared/components/Button";
import toast from "react-hot-toast";
import { productSchema } from "./features/products/schemas/productSchema";
import { z } from "zod";
import { ProductCard } from "./shared/components/ProductCard";
import { Product } from "./shared/product/entities/Product";
import { ModalProduct } from "./shared/components/ModalProduct";

export default function Page() {
  const [mswReady, setMswReady] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<Product>({} as Product);

  const {
    products,
    createProduct,
    editProduct,
    deleteProduct,
    search,
    setSearch,
    sort,
    setSort,
  } = useProducts(mswReady);

  async function handleCreate() {
    try {
      setErrors({});

      const parsed = productSchema.parse({
        ...form,
        price: Number(form.price),
      });

      await createProduct(parsed);

      toast.success("Produto criado com sucesso 🚀");

      setForm({
        name: "",
        category: "",
        price: "",
        description: "",
        imageUrl: "",
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};

        if (err instanceof z.ZodError) {
          const fieldErrors: Record<string, string> = {};

          err.issues.forEach((e) => {
            if (e.path[0]) {
              fieldErrors[e.path[0] as string] = e.message;
            }
          });

          setErrors(fieldErrors);
          return;
        }

        setErrors(fieldErrors);
        return;
      }

      toast.error("Erro ao criar produto");
    }
  }

  function handleSave(data: z.infer<typeof productSchema>) {
    if (editing) {
      editProduct({ ...editing, ...data });
      setEditing({} as Product);
    } else {
      createProduct(data);
    }
  }

  function handleEdit(p: Product) {
    setEditing(p);
    setOpenModal(true);
  }

  useEffect(() => {
    async function init() {
      if (process.env.NODE_ENV === "development") {
        const { worker } = await import("../app/infra/mocks/browser"); // ajuste path
        await worker.start({
          onUnhandledRequest: "bypass",
        });

        console.log("🟢 MSW STARTED");
      }

      setMswReady(true);
    }

    init();
  }, []);

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-6">Gerenciador de Produtos</h1>
        <Button onClick={() => setOpenModal(true)} variant="secondary">
          Novo produto
        </Button>
      </div>

      <div className="flex gap-3 mt-6">
        <Input
          placeholder="Buscar por nome ou preço..."
          value={search}
          icon="search"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-xl px-3 h-10"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Ordenar</option>
          <option value="price_asc">Preço ↑</option>
          <option value="price_desc">Preço ↓</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onEdit={handleEdit}
            onDelete={deleteProduct}
          />
        ))}
      </div>

      <ModalProduct
        key={editing?.id ?? "new"}
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditing({} as Product);
        }}
        editing={editing}
        onSave={handleSave}
      />
    </Container>
  );
}
