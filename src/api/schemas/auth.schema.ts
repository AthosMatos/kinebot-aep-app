import z from "zod";

export const loginSchema = z.object({
    email: z
        .email('Email inválido')
        .min(1, "Email é obrigatório")
        .trim(),
    password: z
        .string()
        .min(1, "Senha é obrigatória")
});

export type loginInput = {
    email: string
    password: string
}