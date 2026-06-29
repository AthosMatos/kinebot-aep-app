import { AppText } from "@/components/app-defaults/app-text";
import { appColors } from "@/constants/colors";
import { useSetAtom } from "jotai";
import { Plus } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { ResultCategory } from "../../../result.constants";
import { addCategoryAtom } from "../atoms";

export const CategoryChip = ({ category }: { category: ResultCategory }) => {
	const addCategory = useSetAtom(addCategoryAtom);

	return (
		<TouchableOpacity
			onPress={() => addCategory(category)}
			className="flex-row items-center gap-2 px-3 h-9 rounded-full border"
			style={{ borderColor: appColors.neutral.light_medium }}
		>
			<View style={{ backgroundColor: category.color }} className="w-3.5 h-3.5 rounded-full" />
			<AppText className="text-sm" style={{ color: appColors.neutral.dark }}>
				{category.label}
			</AppText>
			<Plus size={14} color={appColors.neutral.medium} />
		</TouchableOpacity>
	);
};
