import { AnalysesFilterParams } from "@/app/(protected)/(tabs)/analyses/modals/analysesFilter/context";

export const countActiveFilters = (params: AnalysesFilterParams): number => {
    let count = 0;
    if (params.q) count++;
    if (params._sort) count++;
    if (params.fieldValue) count += Object.values(params.fieldValue).filter(Boolean).length;
    return count;
};