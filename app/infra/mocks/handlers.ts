import { http, HttpResponse } from "msw";
import { Product } from "../../shared/product/entities/Product";

type CreateProductBody = Omit<Product, "id" | "createdAt">;

const products: Product[] = [
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
  http.get("/api/products", () => {
    console.log("🔥 MSW interceptou GET /api/products");
    return HttpResponse.json(products);
  }),

  http.post("/api/products", async ({ request }) => {
    console.log("🔥 MSW interceptou POST /api/products");

    const body = (await request.json()) as CreateProductBody;

    const newProduct: Product = {
      ...body,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    products.unshift(newProduct);

    return HttpResponse.json(newProduct);
  }),
];
