import { Result } from "@/api/endpoints/analyses.endpoints";
import { AppText } from "@/components/app-defaults/app-text";
import { appColors } from "@/constants/colors";
import { useSetAtom } from "jotai";
import { Trash } from "lucide-react-native";
import { TextInput, TouchableOpacity, View } from "react-native";
import { removeCategoryAtom, setPercentageAtom } from "../atoms";

export const ResultRow = ({ result }: { result: Result }) => {
	const setPercentage = useSetAtom(setPercentageAtom);
	const removeCategory = useSetAtom(removeCategoryAtom);

	return (
		<View className="flex-row items-center gap-3">
			<View style={{ backgroundColor: result.color }} className="w-5 h-5 rounded" />
			<AppText className="flex-1 text-black">{result.label}</AppText>
			<View
				className="flex-row items-center px-3 rounded-lg border"
				style={{ borderColor: appColors.neutral.light_medium, backgroundColor: "white" }}
			>
				<TextInput
					className="w-10 py-2 text-right text-base"
					style={{ margin: 0, padding: 0, color: appColors.neutral.dark, fontFamily: "FiraSans" }}
					keyboardType="number-pad"
					value={String(result.percentage)}
					onChangeText={(t) => {
						const n = parseInt(t.replace(/[^0-9]/g, "") || "0", 10);
						setPercentage({ key: result.key, percentage: Math.min(100, Math.max(0, n)) });
					}}
					selectTextOnFocus
				/>
				<AppText className="text-base" style={{ color: appColors.neutral.medium }}>
					%
				</AppText>
			</View>
			<TouchableOpacity onPress={() => removeCategory(result.key)} hitSlop={8} className="p-1">
				<Trash size={18} color={appColors.feedback.danger} />
			</TouchableOpacity>
		</View>
	);
};
