import { Toast } from "toastify-react-native";

export const tokenRefreshToast = {
	/** Show a persistent loading toast while token is being refreshed */
	loading: () => {
		Toast.show({
			type: "info",
			text1: "Renovando sessão...",
			text2: "Aguarde um momento",
			autoHide: false,
			useModal: false,
		});
	},
	/** Show success toast after token refresh */
	success: () => {
		Toast.hide();
		Toast.show({
			type: "success",
			text1: "Sessão renovada",
			text2: "Tudo certo!",
			autoHide: true,
			useModal: false,
		});
	},
	/** Show error toast when token refresh fails */
	error: () => {
		Toast.hide();
		Toast.show({
			type: "error",
			text1: "Erro ao renovar sessão",
			text2: "Por favor, faça login novamente",
			autoHide: true,
			useModal: false,
		});
	},
};
