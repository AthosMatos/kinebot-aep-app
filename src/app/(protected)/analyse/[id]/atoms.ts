import { getAnalysesbyIdQueryAtom } from "@/atoms/api/anayles/query";
import { atom } from "jotai";

export const deleteModalVisibleAtom = atom(false)

export const analysePieSeriesAtom = (id: string) => atom((get) => {
    const { data } = get(getAnalysesbyIdQueryAtom(id))
    return data?.result?.map((res) => {
        return {
            value: res.percentage,
            color: res.color,
            label: res.percentage < 10 ? undefined : {
                text: `${res.percentage}%`,
                fontWeight: 'bold',
                fontSize: 14,
                fill: 'white'
            }
        }
    }) || []
})