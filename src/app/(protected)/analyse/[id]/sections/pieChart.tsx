import { AppLoad } from "@/components/app-defaults/app-load";
import { AppText } from "@/components/app-defaults/app-text";
import { useLocalSearchParams } from "expo-router";
import { useAtomValue } from "jotai";
import { View } from "react-native";
import PieChart from 'react-native-pie-chart';
import { RESULT_CATEGORIES } from "../../result.constants";
import { analysePieSeriesAtom } from "../atoms";
import { useAnalyseDataContext } from "../context";

export const AnylsePieChart = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const analysePieSeries = useAtomValue(analysePieSeriesAtom(id))
    const { isLoading, } = useAnalyseDataContext()

    return <View className="gap-7">
        <AppText className="text-black font-bold text-xl">Resultado da análise</AppText>
        <View className="flex-row items-center gap-5">
            {!isLoading ? analysePieSeries.length ? <PieChart padAngle={0.02} widthAndHeight={180} series={analysePieSeries} /> : <View className="w-[180px] bg-stone-200 aspect-square flex-row justify-center rounded-full items-center">
                <AppText className="text-stone-500">
                    Sem gráfico de analise
                </AppText>
            </View> : <AppLoad size={180} />}
            <View className="gap-4">
                {RESULT_CATEGORIES.map((ppv) =>
                    <View className="flex-row gap-2"
                        key={ppv.key}>
                        <View
                            style={{ backgroundColor: ppv.color }}
                            className={`rounded w-5 h-5 `} />
                        <AppText className="">
                            {ppv.label}
                        </AppText>
                    </View>)}
            </View>
        </View>
    </View>
}