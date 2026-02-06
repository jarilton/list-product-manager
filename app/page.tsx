"use client";

import { useEffect, useState } from "react";
import { useProducts } from "./features/products/hooks/useProducts";
import { Container } from "./shared/components/Container";
import { Card } from "./shared/components/Card";
import { Input } from "./shared/components/Input";
import { Button } from "./shared/components/Button";

export default function Page() {
  const {
    products,
    createProduct,
    search,
    setSearch,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sort,
    setSort,
  } = useProducts();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  async function handleCreate() {
    await createProduct({
      ...form,
      price: Number(form.price),
    });

    setForm({
      name: "",
      category: "",
      price: "",
      description: "",
      imageUrl: "",
    });
  }

  useEffect(() => {
    async function initMSW() {
      if (process.env.NODE_ENV === "development") {
        const { worker } = await import("./api/browser");
        worker.start({ onUnhandledRequest: "bypass" });
      }
    }
    initMSW();
  }, []);

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Product Manager</h1>

      <Card>
        <h2 className="font-semibold mb-4">Create Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <Input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <Input
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
        </div>

        <Input
          placeholder="Description"
          className="mt-3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <Button className="mt-4" onClick={handleCreate}>
          Add Product
        </Button>
      </Card>

      <div className="flex flex-wrap gap-3 mt-6">
        <Input
          placeholder="Search name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Input
          placeholder="Min price"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <Input
          placeholder="Max price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <select
          className="border rounded-xl px-3"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
        </select>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {products.map((p) => (
          <Card key={p.id}>
            <img
              src={p.imageUrl}
              className="w-full h-40 object-cover rounded-xl mb-2"
            />

            <h3 className="font-bold">{p.name}</h3>
            <p className="text-sm text-zinc-500">{p.category}</p>
            <p className="font-semibold mt-2">R$ {p.price}</p>
            <p className="text-sm mt-2">{p.description}</p>
          </Card>
        ))}
      </div>
    </Container>
  );
}
