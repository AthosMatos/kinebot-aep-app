import { AnalysesFilterModal } from "@/app/(protected)/(tabs)/analyses/modals/analysesFilter";
import { AppText } from "@/components/app-defaults/app-text";
import { View } from "react-native";
import { AnalyseListContextProvider } from "./context";
import { AnalyseList } from "./sections/list";
import { AnalyseListHeader } from "./sections/ListHeader";

function AnalyseListContent() {
	return (
		<View className="items-center justify-center flex-1 pt-8 gap-8">
			<AppText className="text-black font-bold text-xl">AEP</AppText>
			<View className="w-full flex-1 gap-3">
				<AnalyseListHeader />
				<AnalyseList />
			</View>
			<AnalysesFilterModal />
		</View>
	);
}

export default function AnalysesPage() {
	return (
		<AnalyseListContextProvider>
			<AnalyseListContent />
		</AnalyseListContextProvider>
	);
}
