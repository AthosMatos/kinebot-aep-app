import { analysesService, GetAllAnalysesParams } from "@/api/endpoints/analyses.endpoints";
import { atomWithInfiniteQuery, atomWithQuery } from "jotai-tanstack-query";

const getAllKey = 'Analyses'
export const getAnalysesQueryAtom = (params?: GetAllAnalysesParams) =>
    atomWithQuery(() => {
        return {
            queryKey: [getAllKey, params],
            queryFn: () => analysesService.get(params),
            staleTime: 30000, // 30 seconds
        }
    });

const PAGE_SIZE = 10

export const getAnalysesInfiniteQueryAtom = (params?: Omit<GetAllAnalysesParams, '_page' | '_limit'>) =>
    atomWithInfiniteQuery(() => ({
        queryKey: [getAllKey, 'infinite', params],
        queryFn: ({ pageParam }) => analysesService.get({ ...params, _page: pageParam as number, _limit: PAGE_SIZE }),
        getNextPageParam: (lastPage: Awaited<ReturnType<typeof analysesService.get>>, allPages) => {
            if (lastPage.length < PAGE_SIZE) return undefined
            return allPages.length + 1
        },
        initialPageParam: 1,
        staleTime: 30000,
    }))

export const getAnalysesbyIdQueryAtom = (id: string) =>
    atomWithQuery(() => {
        return {
            queryKey: [id],
            queryFn: async () => {
                return await analysesService.getbyId(id)
            },
            staleTime: 30000, // 30 seconds
        }
    });



