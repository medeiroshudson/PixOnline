import { z } from "zod";

export const pixSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório."),
  chave: z.string().min(1, "A chave Pix é obrigatória."),
  valor: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^\d{1,8},\d{2}$/.test(v),
      { message: "Informe um valor válido no formato 0,00." }
    ),
  cidade: z.string().optional(),
  identificacao: z.string().optional(),
  descricao: z.string().optional(),
});

export type Pix = z.infer<typeof pixSchema>;