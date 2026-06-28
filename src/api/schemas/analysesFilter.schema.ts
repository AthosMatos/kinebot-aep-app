import z from "zod/v3";

export const analysesFilterSchema = z.object({
    q: z.string(),
    _sort: z.string(),
    _order: z.string(),
    company: z.string(),
    evaluator: z.string(),
    sector: z.string(),
    workstation: z.string(),
});

export type AnalysesFilterInput = z.infer<typeof analysesFilterSchema>;
