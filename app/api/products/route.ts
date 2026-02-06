import { NextResponse } from "next/server";

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

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newProduct = {
    ...body,
    id: crypto.randomUUID(),
    createdAt: new Date(),
  };

  products.unshift(newProduct);

  return NextResponse.json(newProduct);
}
