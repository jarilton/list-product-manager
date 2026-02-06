import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres"),

  category: z
    .string()
    .min(1, "Categoria é obrigatória")
    .min(2, "Categoria deve ter pelo menos 2 caracteres"),

  price: z.coerce.number().refine((v) => v > 0, {
    message: "Preço deve ser maior que 0",
  }),

  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .min(5, "Descrição deve ter pelo menos 5 caracteres"),

  imageUrl: z
    .string()
    .min(1, "URL da imagem é obrigatória")
    .url("Informe uma URL válida"),
});

export type ProductFormData = z.infer<typeof productSchema>;
