import { AppText } from "@/components/app-defaults/app-text";
import { appColors } from "@/constants/colors";
import { ArrowDown, ArrowUp } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { SORT_OPTIONS, useAnalysesFilterForm } from "../context";
import { SectionLabel } from "./SectionLabel";

export const SortChips = () => {
	const { values, handleSortChip } = useAnalysesFilterForm();

	return (
		<View className="gap-3">
			<SectionLabel>Ordenar por</SectionLabel>
			<View className="flex-row flex-wrap gap-2">
				{SORT_OPTIONS.map((opt) => {
					const isActive = values._sort === opt.value;
					return (
						<TouchableOpacity
							key={opt.value}
							onPress={() => handleSortChip(opt.value)}
							className="flex-row items-center gap-1.5 px-3 h-9 rounded-full border"
							style={{
								backgroundColor: isActive ? appColors.primary : "white",
								borderColor: isActive ? appColors.primary : appColors.neutral.light_medium,
							}}
						>
							<AppText
								className="text-sm font-medium"
								style={{ color: isActive ? "white" : appColors.neutral.dark }}
							>
								{opt.label}
							</AppText>
							{isActive &&
								(values._order === "asc" ? (
									<ArrowUp size={14} color="white" />
								) : (
									<ArrowDown size={14} color="white" />
								))}
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};
