import { AnalysesInput } from "@/api/schemas/analyses.schema";
import { AppButton } from "@/components/app-defaults/app-button";
import { AppModal } from "@/components/app-defaults/app-modal/app-modal";
import { useAppFormContext } from "@/contexts/form.context";
import { useAtom, useSetAtom, useStore } from "jotai";
import { useEffect } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { resultDraftAtom, resultModalVisibleAtom } from "./atoms";
import { AddCategorySection } from "./sections/AddCategorySection";
import { ResultChartPreview } from "./sections/ResultChartPreview";
import { ResultList } from "./sections/ResultList";
import { normalizeResults } from "./utils";

export const ResultModal = () => {
	const [visible, setVisible] = useAtom(resultModalVisibleAtom);
	const { getValues, setValue } = useAppFormContext<AnalysesInput>();
	const setDraft = useSetAtom(resultDraftAtom);
	const store = useStore();

	// Popula o draft com o valor atual do form sempre que o modal abre.
	useEffect(() => {
		if (visible) setDraft(normalizeResults(getValues("result") ?? []));
	}, [visible]);

	const handleConfirm = () => {
		const draft = store.get(resultDraftAtom);
		setValue("result", draft.filter((r) => r.percentage > 0));
		setVisible(false);
	};

	return (
		<AppModal
			visible={visible}
			onClose={() => setVisible(false)}
			title="Resultado da análise"
			padChildren
			useScrollView={false}
			footer={
				<View className="flex-row gap-3 pb-2">
					<AppButton className="flex-1" small variant="outline" onPress={() => setVisible(false)}>
						Cancelar
					</AppButton>
					<AppButton className="flex-1" small variant="default" onPress={handleConfirm}>
						Confirmar
					</AppButton>
				</View>
			}
		>
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-4 gap-6" bottomOffset={24}>
				<ResultChartPreview />
				<ResultList />
				<AddCategorySection />
			</KeyboardAwareScrollView>
		</AppModal>
	);
};
