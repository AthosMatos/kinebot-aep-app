import { AppButton } from "@/components/app-defaults/app-button";
import { appColors } from "@/constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import { useSetAtom } from "jotai";
import { PencilLine, Trash } from "lucide-react-native";
import { View } from "react-native";
import { deleteModalVisibleAtom } from "../atoms";

export const AnalyseActions = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const setDeleteModalVisible = useSetAtom(deleteModalVisibleAtom)

    return <View className="flex-row gap-4 w-full">
        <AppButton
            customIcon={<PencilLine size={18} color={appColors.primary_dark} />}
            variant="outline"
            className="flex-1"
            onPress={() => router.push(`/analyse/edit/${id}`)}
        >
            Editar
        </AppButton>
        <AppButton
            customIcon={<Trash size={18} color={appColors.feedback.danger} />}
            variant="delete"
            className="flex-1"
            onPress={() => setDeleteModalVisible(true)}
        >
            Excluir
        </AppButton>
    </View>
}