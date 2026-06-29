import { Result } from "@/api/endpoints/analyses.endpoints";
import { atom } from "jotai";
import { RESULT_CATEGORIES, ResultCategory } from "../../result.constants";

export const resultModalVisibleAtom = atom(false)

// Draft sendo editado dentro do modal: populado a partir do form ao abrir e
// commitado de volta no form ao confirmar.
export const resultDraftAtom = atom<Result[]>([])

// Derivados — cada seção lê só o que precisa.
export const resultTotalAtom = atom((get) =>
    get(resultDraftAtom).reduce((sum, r) => sum + r.percentage, 0)
)

export const resultSeriesAtom = atom((get) =>
    get(resultDraftAtom)
        .filter((r) => r.percentage > 0)
        .map((r) => ({
            value: r.percentage,
            color: r.color,
            label:
                r.percentage < 10
                    ? undefined
                    : { text: `${r.percentage}%`, fontWeight: "bold", fontSize: 14, fill: "white" },
        }))
)

export const unusedCategoriesAtom = atom((get) => {
    const draft = get(resultDraftAtom)
    return RESULT_CATEGORIES.filter((c) => !draft.some((r) => r.key === c.key))
})

// Ações (write-only) — componentes despacham sem subscrever ao draft inteiro.
export const addCategoryAtom = atom(null, (get, set, cat: ResultCategory) => {
    const remaining = Math.max(0, 100 - get(resultTotalAtom))
    set(resultDraftAtom, [
        ...get(resultDraftAtom),
        { key: cat.key, label: cat.label, color: cat.color, percentage: remaining },
    ])
})

export const setPercentageAtom = atom(null, (get, set, payload: { key: string; percentage: number }) => {
    set(
        resultDraftAtom,
        get(resultDraftAtom).map((r) => (r.key === payload.key ? { ...r, percentage: payload.percentage } : r))
    )
})

export const removeCategoryAtom = atom(null, (get, set, key: string) => {
    set(resultDraftAtom, get(resultDraftAtom).filter((r) => r.key !== key))
})
