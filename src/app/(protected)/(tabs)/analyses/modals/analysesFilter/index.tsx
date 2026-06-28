import { filterParamsAtom, filterVisibleAtom } from "@/app/(protected)/(tabs)/analyses/atoms";
import { AppButton } from "@/components/app-defaults/app-button";
import { AppModal } from "@/components/app-defaults/app-modal/app-modal";
import { AppForm } from "@/components/form";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { FieldFilters } from "./components/FieldFilters";
import { SectionLabel } from "./components/SectionLabel";
import { SortChips } from "./components/SortChips";
import { FilterModalProvider, paramsToForm, useAnalysesFilterForm } from "./context";

const FilterModalContent = () => {
	const filterVisible = useAtomValue(filterVisibleAtom);
	const filterParams = useAtomValue(filterParamsAtom);
	const setFilterVisible = useSetAtom(filterVisibleAtom);
	const { control, submit, handleClear, reset } = useAnalysesFilterForm();

	// Re-sync the form with the applied filters each time the modal opens.
	useEffect(() => {
		if (filterVisible) reset(paramsToForm(filterParams));
	}, [filterVisible]);

	return (
		<AppModal
			visible={filterVisible}
			onClose={() => setFilterVisible(false)}
			title="Filtros"
			padChildren
			useScrollView={false}
			footer={
				<View className="flex-row gap-3">
					<AppButton small className="flex-1" variant="outline" onPress={handleClear}>
						Limpar
					</AppButton>
					<AppButton small className="flex-1" onPress={submit}>Aplicar</AppButton>
				</View>
			}
		>
			<KeyboardAwareScrollView
				showsVerticalScrollIndicator={false}
				contentContainerClassName="gap-6"
				bottomOffset={24}>
				<View className="gap-3">
					<SectionLabel>Busca</SectionLabel>
					<AppForm
						control={control}
						render={({ Input }) => (
							<Input
								name="q"
								label="Busca geral"
								placeholder="Buscar em todos os campos..."
								autoCorrect={false}
								autoCapitalize="none"
							/>
						)}
					/>
				</View>

				<SortChips />

				<FieldFilters />
			</KeyboardAwareScrollView>
		</AppModal>
	);
};

export const AnalysesFilterModal = () => (
	<FilterModalProvider>
		<FilterModalContent />
	</FilterModalProvider>
);
