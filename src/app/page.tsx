"use client";

import { useState } from "react";
import { useProducts } from "./features/products/hooks/useProducts";
import { Container } from "./shared/components/Container";
import { Card } from "./shared/components/Card";
import { Input } from "./shared/components/Input";
import { Button } from "./shared/components/Button";
import toast from "react-hot-toast";
import { productSchema } from "./features/products/schemas/productSchema";
import { z } from "zod";

export default function Page() {
  const { products, createProduct, search, setSearch, sort, setSort } =
    useProducts();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Gerenciador de Produtos</h1>

      {/* CREATE */}
      <Card>
        <h2 className="font-semibold mb-4">Criar Produto</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
        </div>

        <Input
          placeholder="Descrição"
          className="mt-3"
          value={form.description}
          error={errors.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="flex justify-end mt-4">
          <Button onClick={handleCreate}>Adicionar Produto</Button>
        </div>
      </Card>

      {/* BUSCA UNICA */}
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

      {/* LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((p) => (
          <Card key={p.id}>
            <img
              src={p.imageUrl}
              className="w-full h-40 object-cover rounded-xl mb-2"
            />

            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-sm text-zinc-500">{p.category}</p>

            <p className="font-semibold mt-2 text-green-600">R$ {p.price}</p>

            <p className="text-sm mt-2 text-zinc-600">{p.description}</p>
          </Card>
        ))}
      </div>
    </Container>
  );
}
