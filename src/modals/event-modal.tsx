import { AppModal } from "@/components/app-defaults/app-modal/app-modal";
import { AppText } from "@/components/app-defaults/app-text";
import { Dimensions } from "react-native";


export const TestModal = () => {
    /*     const [modalVisible, setModalVisible] = useAtom(eventModalOpenAtom);
        const { data: event } = useAtomValue(eventQueryByIdAtom(modalVisible)); */
    const name = 'teste'
    const modalVisible = false
    const setModalVisible = (value: boolean | null) => { }

    return (
        <AppModal
            padChildren
            title={name}
            visible={!!modalVisible}
            onClose={() => setModalVisible(null)}
            style={{ height: Dimensions.get("window").height * 0.76 }}
        /* footer={
            <AppButton
                variant="outline"
                label="Ver lista de eventos"
                onPress={() => handleIsIcognito(handleSeeAllEvents)}
            />
        } */
        >
            <AppText>
                {name}
            </AppText>
        </AppModal>
    );
};
