import { http, HttpResponse } from "msw";
import { Product } from "../../domain/product/entities/Product";

const products = [
  {
    id: "1",
    name: "Macbook Pro",
    category: "Eletrônicos",
    price: 12000,
    description: "Notebook Apple",
    imageUrl: "https://picsum.photos/200",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "iPhone 15",
    category: "Celulares",
    price: 8000,
    description: "Novo iPhone",
    imageUrl: "https://picsum.photos/201",
    createdAt: new Date(),
  },
];

export const handlers = [
  http.get("/products", () => {
    return HttpResponse.json(products);
  }),

  http.post("/products", async ({ request }) => {
    const body = await request.json();

    const newProduct = {
      ...(body as Omit<Product, "id" | "createdAt">),
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    products.unshift(newProduct);

    return HttpResponse.json(newProduct);
  }),
];
