import { Toast } from "toastify-react-native";

export const authToast = {
	wrongCredentials: (error: string) => {
		Toast.hide();
		Toast.show({
			type: "default",
			text1: error,
			text2: "Por favor, faça login novamente",
			useModal: false,
		});
	},
};
