import { AppText } from "@/components/app-defaults/app-text";
import { appColors } from "@/constants/colors";
import { useAtomValue } from "jotai";
import { View } from "react-native";
import { unusedCategoriesAtom } from "../atoms";
import { CategoryChip } from "../components/CategoryChip";

export const AddCategorySection = () => {
	const unused = useAtomValue(unusedCategoriesAtom);

	if (!unused.length) return null;

	return (
		<View className="gap-2">
			<AppText className="text-sm font-semibold" style={{ color: appColors.neutral.medium }}>
				Adicionar valor
			</AppText>
			<View className="flex-row flex-wrap gap-2">
				{unused.map((cat) => (
					<CategoryChip key={cat.key} category={cat} />
				))}
			</View>
		</View>
	);
};
