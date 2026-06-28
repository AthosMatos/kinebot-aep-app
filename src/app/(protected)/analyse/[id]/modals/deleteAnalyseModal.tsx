import { deleteAnalysisAtom } from "@/atoms/api/anayles/mutations";
import { getAnalysesbyIdQueryAtom } from "@/atoms/api/anayles/query";
import { AppButton } from "@/components/app-defaults/app-button";
import { AppModal } from "@/components/app-defaults/app-modal/app-modal";
import { router, useLocalSearchParams } from "expo-router";
import { useAtom, useAtomValue } from "jotai";
import { View } from "react-native";
import { deleteModalVisibleAtom } from "../atoms";

export const DeleteAnalyseModal = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [deleteModalVisible, setDeleteModalVisible] = useAtom(deleteModalVisibleAtom)
    const { mutateAsync: deleteAnalysis, isPending: isDeleting } = useAtomValue(deleteAnalysisAtom)
    const { data } = useAtomValue(getAnalysesbyIdQueryAtom(id))

    const handleDelete = async () => {
        await deleteAnalysis(id)
        setDeleteModalVisible(false)
        router.back()
    }

    return <AppModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        title="Excluir análise"
        subtitle={`A análise "${data?.title}" será permanentemente removida e não poderá ser recuperada.`}
        padChildren
        footer={
            <View className="flex-row gap-3 pb-2">
                <AppButton className="flex-1" small variant="outline" onPress={() => setDeleteModalVisible(false)}>
                    Cancelar
                </AppButton>
                <AppButton small className="flex-1" variant="delete" isLoading={isDeleting} onPress={handleDelete}>
                    Excluir
                </AppButton>
            </View>
        }
    />
}