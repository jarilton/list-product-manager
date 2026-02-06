import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Nome obrigatório"),
  category: z.string().min(2, "Categoria obrigatória"),
  price: z.coerce.number().min(1, "Preço deve ser maior que 0"),
  description: z.string().min(5, "Descrição obrigatória"),
  imageUrl: z.string().url("URL inválida"),
});

export type ProductFormData = z.infer<typeof productSchema>;
