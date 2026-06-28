import { Analyse } from "@/api/endpoints/analyses.endpoints";
import { getAnalysesInfiniteQueryAtom } from "@/atoms/api/anayles/query";
import { useAtomValue } from "jotai";
import { createContext, PropsWithChildren, useContext } from "react";
import { filterParamsAtom } from "./atoms";

interface AnalyseListContextProps {
    analyses: Analyse[]
    isLoading: boolean
    fetchNextPage: () => void
    isFetchingNextPage: boolean
    hasNextPage: boolean
}

const AnalyseListContext = createContext<AnalyseListContextProps>({} as any)

export const AnalyseListContextProvider = (props: PropsWithChildren) => {
    const filterParams = useAtomValue(filterParamsAtom)
    const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
        useAtomValue(getAnalysesInfiniteQueryAtom(filterParams));

    const analyses = data?.pages.flat() ?? [];

    return (
        <AnalyseListContext.Provider value={{ analyses, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage }}>
            {props.children}
        </AnalyseListContext.Provider>
    )
}

export const useAnalyseListContext = () => useContext(AnalyseListContext)
