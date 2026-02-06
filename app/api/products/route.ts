import { NextResponse } from "next/server";

let products = [
  {
    id: "1",
    name: "Macbook Pro",
    category: "Eletrônicos",
    price: 12000,
    description: "Notebook Apple",
    imageUrl: "https://picsum.photos/200",
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

export async function DELETE(req: Request) {
  const { id } = await req.json();
  products = products.filter((p) => p.id !== id);
  return NextResponse.json(true);
}

export async function PUT(req: Request) {
  const body = await req.json();

  products = products.map((p) => (p.id === body.id ? body : p));

  return NextResponse.json(body);
}
