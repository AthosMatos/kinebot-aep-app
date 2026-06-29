import z from "zod/v3";

export const analysesSchema = z.object({
    title: z.string().min(1, "Título é obrigatório"),
    company: z.string().optional(),
    industrialPlant: z.string().optional(),
    sector: z.string().optional(),
    workstation: z.string().optional(),
    activity: z.string().optional(),
    evaluator: z.string().optional(),
    analysisDate: z.date().optional(),
    result: z
        .array(
            z.object({
                key: z.string(),
                label: z.string(),
                color: z.string(),
                percentage: z.number().min(0).max(100),
            })
        )
        .optional(),
});

export type AnalysesInput = z.infer<typeof analysesSchema>;
