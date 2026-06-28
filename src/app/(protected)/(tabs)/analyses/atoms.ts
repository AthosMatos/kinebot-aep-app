import { AnalysesFilterParams } from "@/app/(protected)/(tabs)/analyses/modals/analysesFilter/context";
import { atom } from "jotai";
import { countActiveFilters } from "./utils";

export const filterParamsAtom = atom<AnalysesFilterParams>({})
export const filterVisibleAtom = atom(false)
export const activeFilterCountAtom = atom((get) => countActiveFilters(get(filterParamsAtom)))
