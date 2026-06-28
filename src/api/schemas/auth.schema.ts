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

export const forgotPasswordSchema = z
    .object({
        email: z
            .email('Email inválido')
            .min(1, "Email é obrigatório")
            .trim(),
        password: z
            .string('Senha é obrigatória')
            .min(6, "A senha deve ter no mínimo 6 caracteres"),
        confirmPassword: z
            .string('Confirme a senha')
            .min(1, "Confirme a senha"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });

export type forgotPasswordInput = {
    email: string
    password: string
    confirmPassword: string
}