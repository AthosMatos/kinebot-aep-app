import { jotaiStore } from "@/atoms/store";
import { queryClientAtom } from "jotai-tanstack-query";

export const invalidadeAnalyseById = (id: string) => {
    const queryClient = jotaiStore.get(queryClientAtom);
    queryClient.invalidateQueries({ queryKey: [id] });

}