import { Analyse } from "@/api/endpoints/analyses.endpoints";
import { getAnalysesbyIdQueryAtom } from "@/atoms/api/anayles/query";
import { useLocalSearchParams } from "expo-router";
import { useAtomValue } from "jotai";
import { createContext, PropsWithChildren, useContext } from "react";

interface AnalyseContextProps {
    data?: Analyse
    isLoading: boolean
}

const AnalyseContext = createContext<AnalyseContextProps>({} as any)

/* Kind overkill here but in real app contexts this would scale much more and this structure would be more usefull */

export const AnalyseDataContextProvider = (props: PropsWithChildren) => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data, isLoading } = useAtomValue(getAnalysesbyIdQueryAtom(id))

    return <AnalyseContext.Provider value={{
        data,
        isLoading
    }}>
        {props.children}
    </AnalyseContext.Provider>
}


export const useAnalyseDataContext = () => {
    const context = useContext(AnalyseContext)

    return context
}