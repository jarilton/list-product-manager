import { Card } from "@/app/shared/components/Card";
import { Button } from "@/app/shared/components/Button";
import { Product } from "../../product/entities/Product";

interface Props {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <Card>
      <img
        src={product.imageUrl}
        className="w-full h-40 object-cover rounded-xl mb-2"
      />

      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-sm text-zinc-400">{product.category}</p>

      <p className="font-semibold mt-2 text-green-400">R$ {product.price}</p>

      <p className="text-sm mt-2 text-zinc-300">{product.description}</p>

      <div className="flex gap-2 mt-4">
        <Button variant="secondary" onClick={() => onEdit(product)}>
          Editar
        </Button>

        <Button variant="danger" onClick={() => onDelete(product.id)}>
          Remover
        </Button>
      </div>
    </Card>
  );
}
