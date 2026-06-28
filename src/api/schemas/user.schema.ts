import z from "zod/v3";

export const editUserSchema = z.object({
    username: z.string().min(1, "Nome de usuário é obrigatório"),
    email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
});

export type EditUserInput = z.infer<typeof editUserSchema>;
