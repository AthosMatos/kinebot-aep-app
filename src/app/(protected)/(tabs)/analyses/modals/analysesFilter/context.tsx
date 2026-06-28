import { GetAllAnalysesParams } from "@/api/endpoints/analyses.endpoints";
import { AnalysesFilterInput, analysesFilterSchema } from "@/api/schemas/analysesFilter.schema";
import { filterParamsAtom, filterVisibleAtom } from "@/app/(protected)/(tabs)/analyses/atoms";
import { AppFormProvider, useAppFormContext } from "@/contexts/form.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue, useSetAtom } from "jotai";
import { PropsWithChildren } from "react";

export type AnalysesFilterParams = Omit<GetAllAnalysesParams, "_page" | "_limit">;

export const SORT_OPTIONS = [
	{ label: "Título", value: "title" },
	{ label: "Data", value: "analysisDate" },
	{ label: "Empresa", value: "company" },
	{ label: "Avaliador", value: "evaluator" },
] as const;

export type SortField = (typeof SORT_OPTIONS)[number]["value"];

export const EMPTY_FILTER_FORM: AnalysesFilterInput = {
	q: "",
	_sort: "",
	_order: "",
	company: "",
	evaluator: "",
	sector: "",
	workstation: "",
};

export const paramsToForm = (p: AnalysesFilterParams): AnalysesFilterInput => ({
	q: p.q ?? "",
	_sort: (p._sort as string) ?? "",
	_order: p._order ?? "",
	company: p.fieldValue?.company ?? "",
	evaluator: p.fieldValue?.evaluator ?? "",
	sector: p.fieldValue?.sector ?? "",
	workstation: p.fieldValue?.workstation ?? "",
});

export const formToParams = (f: AnalysesFilterInput): AnalysesFilterParams => {
	const fieldValue = {
		company: f.company || undefined,
		evaluator: f.evaluator || undefined,
		sector: f.sector || undefined,
		workstation: f.workstation || undefined,
	};
	const hasFieldValue = Object.values(fieldValue).some(Boolean);
	return {
		q: f.q || undefined,
		_sort: (f._sort || undefined) as AnalysesFilterParams["_sort"],
		_order: (f._order || undefined) as AnalysesFilterParams["_order"],
		fieldValue: hasFieldValue ? fieldValue : undefined,
	};
};

export const FilterModalProvider = ({ children }: PropsWithChildren) => {
	const filterParams = useAtomValue(filterParamsAtom);
	const setFilterParams = useSetAtom(filterParamsAtom);
	const setFilterVisible = useSetAtom(filterVisibleAtom);

	const onSubmit = (values: AnalysesFilterInput) => {
		setFilterParams(formToParams(values));
		setFilterVisible(false);
	};

	return (
		<AppFormProvider
			resolver={zodResolver(analysesFilterSchema)}
			onSubmit={onSubmit}
			defaultValues={paramsToForm(filterParams)}
		>
			{children}
		</AppFormProvider>
	);
};

/* Wraps the generic form context with the filter-specific helpers (sort cycling + clear). */
export const useAnalysesFilterForm = () => {
	const form = useAppFormContext<AnalysesFilterInput>();
	const setFilterParams = useSetAtom(filterParamsAtom);
	const setFilterVisible = useSetAtom(filterVisibleAtom);

	const handleClear = () => {
		form.reset(EMPTY_FILTER_FORM);
		setFilterParams({});
		setFilterVisible(false);
	};

	const handleSortChip = (field: SortField) => {
		const { _sort, _order } = form.values;
		if (_sort !== field) {
			form.setValue("_sort", field);
			form.setValue("_order", "asc");
		} else if (_order === "asc") {
			form.setValue("_order", "desc");
		} else {
			form.setValue("_sort", "");
			form.setValue("_order", "");
		}
	};

	return { ...form, handleClear, handleSortChip };
};
