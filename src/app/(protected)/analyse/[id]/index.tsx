import { AppText } from "@/components/app-defaults/app-text";
import { LazyLoad } from "@/components/LazyLoad";
import { View } from "react-native";
import { AnalyseDataContextProvider, useAnalyseDataContext } from "./context";
import { DeleteAnalyseModal } from "./modals/deleteAnalyseModal";
import { AnalyseActions } from "./sections/actions";
import { AnalyseInfo } from "./sections/info";
import { AnylsePieChart } from "./sections/pieChart";

function AnalyseContent() {
    const { isLoading, data } = useAnalyseDataContext()

    return <LazyLoad loading={isLoading} >
        <View className="items-center w-full px-4 gap-8 flex-1 pt-8">
            <AppText className="text-black font-bold text-xl">{data?.title}</AppText>
            <View className="gap-4">
                <View className="bg-white w-full border border-stone-200 p-6 rounded-xl gap-8">
                    <AnalyseInfo />
                    <AnylsePieChart />
                </View>
                <AnalyseActions />
            </View>
        </View>
        <DeleteAnalyseModal />
    </LazyLoad>
}

export default function Analyse() {

    return <AnalyseDataContextProvider>
        <AnalyseContent />
    </AnalyseDataContextProvider>


}
