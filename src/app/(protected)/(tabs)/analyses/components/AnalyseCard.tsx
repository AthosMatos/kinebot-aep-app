import { Analyse } from "@/api/endpoints/analyses.endpoints";
import { AppText } from "@/components/app-defaults/app-text";
import { appColors } from "@/constants/colors";
import { formatToBrazilianDate } from "@/utils/date.utils";
import { router } from "expo-router";
import { FileText } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";


export const AnalyseCard = (analyses: Analyse) => (
    <TouchableOpacity
        onPress={() => router.push(`/analyse/${analyses.id}`)}
        className="flex-row gap-5 bg-white p-4 rounded-xl border border-stone-200"
    >
        <View className="bg-gray-100 justify-center w-12 h-12 rounded-md items-center">
            <FileText color={appColors.primary_dark} />
        </View>
        <View className="gap-1">
            <AppText className="font-bold">{analyses.title}</AppText>
            <AppText className="text-stone-500">{formatToBrazilianDate(analyses.analysisDate)}</AppText>
        </View>
    </TouchableOpacity>
);