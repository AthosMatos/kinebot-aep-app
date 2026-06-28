import { analysesService } from "@/api/endpoints/analyses.endpoints";
import { analysesToast } from "@/toasts/analyses.toast";
import { atomWithMutation, queryClientAtom } from "jotai-tanstack-query";

const getAllKey = "Analyses";

export const postAnalysisAtom = atomWithMutation(
    (get) => ({
        mutationKey: ["analyses", "post"],
        mutationFn: analysesService.post,
        onSuccess: async () => {
            const queryClient = get(queryClientAtom);
            await queryClient.invalidateQueries({ queryKey: [getAllKey] });
            analysesToast.success.post();
        },
    }),
    (get) => get(queryClientAtom)
);

export const putAnalysisAtom = atomWithMutation(
    (get) => ({
        mutationKey: ["analyses", "put"],
        mutationFn: ({ id, body }: { id: string; body: Parameters<typeof analysesService.put>[1] }) =>
            analysesService.put(id, body),
        onSuccess: async () => {
            const queryClient = get(queryClientAtom);
            await queryClient.invalidateQueries({ queryKey: [getAllKey] });
            analysesToast.success.put();
        },
    }),
    (get) => get(queryClientAtom)
);

export const deleteAnalysisAtom = atomWithMutation(
    (get) => ({
        mutationKey: ["analyses", "delete"],
        mutationFn: (id: string) => analysesService.delete(id),
        onSuccess: async (_data, id) => {
            const queryClient = get(queryClientAtom);
            await queryClient.invalidateQueries({ queryKey: [getAllKey] });
            queryClient.removeQueries({ queryKey: [id] });
            analysesToast.success.delete();
        },
    }),
    (get) => get(queryClientAtom)
);
