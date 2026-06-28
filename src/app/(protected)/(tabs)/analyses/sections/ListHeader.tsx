import { AppButton } from "@/components/app-defaults/app-button";
import { AppText } from "@/components/app-defaults/app-text";
import { appColors } from "@/constants/colors";
import { router } from "expo-router";
import { useAtomValue, useSetAtom } from "jotai";
import { View } from "react-native";
import { activeFilterCountAtom, filterVisibleAtom } from "../atoms";
import { useAnalyseListContext } from "../context";

export const AnalyseListHeader = () => {
    const { analyses } = useAnalyseListContext();
    const activeFilterCount = useAtomValue(activeFilterCountAtom);
    const setFilterVisible = useSetAtom(filterVisibleAtom);

    return (
        <View className="w-full px-4 gap-2">
            <View className="flex-row items-center justify-between">
                <View>
                    <AppButton
                        small
                        variant="outline"
                        icon="options-outline"
                        onPress={() => setFilterVisible(true)}
                    >
                        Filtros
                    </AppButton>
                    {activeFilterCount > 0 && (
                        <View
                            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full items-center justify-center"
                            style={{ backgroundColor: appColors.primary }}
                        >
                            <AppText className="text-white" style={{ fontSize: 10, lineHeight: 14 }}>
                                {activeFilterCount}
                            </AppText>
                        </View>
                    )}
                </View>


                <AppButton small icon="add-circle-outline" onPress={() => router.push("/analyse/create")}>
                    Nova análise
                </AppButton>

            </View>
            <AppText className="text-stone-500 text-md">{analyses.length} relatórios</AppText>

        </View>
    );
}
