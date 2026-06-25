import z from "zod";

export const loginSchema = z.object({
    email: z
        .email('Email inválido')
        .min(1, "Email é obrigatório")
        .trim(),
    password: z
        .string('Senha é obrigatória')
        .min(1, "Senha é obrigatória"),
    shouldPersist: z.boolean()
});

export type loginInput = {
    email: string
    password: string
    shouldPersist: boolean
}