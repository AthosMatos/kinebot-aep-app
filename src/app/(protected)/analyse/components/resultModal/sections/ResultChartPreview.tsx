import { AppText } from "@/components/app-defaults/app-text";
import { appColors } from "@/constants/colors";
import { useAtomValue } from "jotai";
import { View } from "react-native";
import PieChart from "react-native-pie-chart";
import { resultSeriesAtom, resultTotalAtom } from "../atoms";

export const ResultChartPreview = () => {
	const series = useAtomValue(resultSeriesAtom);
	const total = useAtomValue(resultTotalAtom);

	const totalColor =
		total === 100 ? appColors.feedback.success : total === 0 ? appColors.neutral.medium : "#F5B400";

	return (
		<View className="items-center gap-2">
			{series.length ? (
				<PieChart padAngle={0.02} widthAndHeight={160} series={series} />
			) : (
				<View className="w-[160px] aspect-square rounded-full items-center justify-center bg-stone-100">
					<AppText className="text-stone-500">Sem valores</AppText>
				</View>
			)}
			<AppText className="font-bold" style={{ color: totalColor }}>
				Total: {total}%
			</AppText>
		</View>
	);
};
