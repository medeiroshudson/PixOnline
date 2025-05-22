import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable().optional(),
  avatarUrl: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type User = z.infer<typeof userSchema>;

export const loginSchema = z.object({
  email: z.string().email("Digite um email válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const signUpSchema = loginSchema.extend({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres").optional(),
});

export interface Session {
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  user?: User;
}
