import { User } from "@/api/endpoints/auth.endpoint";
import { EditUserInput, editUserSchema } from "@/api/schemas/user.schema";
import { updateUserAtom } from "@/atoms/api/auth/mutations";
import { userAtom } from "@/atoms/auth/user";
import { loginValuesAtom } from "@/mock/atoms/login.mock.atoms";
import { mockUserAtom } from "@/mock/atoms/user.mock.atoms";
import { AppButton } from "@/components/app-defaults/app-button";
import { AppModal } from "@/components/app-defaults/app-modal/app-modal";
import { AppText } from "@/components/app-defaults/app-text";
import { AppForm } from "@/components/form";
import { appColors } from "@/constants/colors";
import { AppFormProvider, useAppFormContext } from "@/contexts/form.context";
import { userToast } from "@/toasts/user.toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Camera, Mail, User as UserIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { editProfileModalVisibleAtom } from "../atoms";

type PictureProps = {
	picture?: string | null;
	setPicture: (uri: string | null | undefined) => void;
};

const EditProfileContent = ({ picture, setPicture }: PictureProps) => {
	const [visible, setVisible] = useAtom(editProfileModalVisibleAtom);
	const user = useAtomValue(userAtom);
	const { isPending } = useAtomValue(updateUserAtom);
	const { control, submit, isValid, reset } = useAppFormContext<EditUserInput>();

	// Re-sync the form + picture with the current user each time the modal opens.
	useEffect(() => {
		if (visible) {
			reset({ username: user?.username ?? "", email: user?.email ?? "" });
			setPicture(user?.profile_picture);
		}
	}, [visible]);

	const pickImage = async () => {
		const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!permission.granted) {
			userToast.error.galleryPermission();
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.7,
		});

		if (!result.canceled) setPicture(result.assets[0].uri);
	};

	const initials = user?.username?.charAt(0).toUpperCase() ?? "?";

	return (
		<AppModal
			visible={visible}
			onClose={() => setVisible(false)}
			title="Editar perfil"
			padChildren
			useScrollView={false}
			footer={
				<View className="flex-row gap-3 pb-2">
					<AppButton className="flex-1" small variant="outline" onPress={() => setVisible(false)}>
						Cancelar
					</AppButton>
					<AppButton
						className="flex-1"
						small
						variant={isValid ? "default" : "disabled"}
						disabled={!isValid}
						isLoading={isPending}
						onPress={submit}
					>
						Salvar
					</AppButton>
				</View>
			}
		>
			<KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-4 gap-6" bottomOffset={24}>
				<View className="items-center gap-3">
					<TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
						{picture ? (
							<Image source={picture} style={{ width: 96, height: 96, borderRadius: 48 }} />
						) : (
							<View
								className="w-24 h-24 rounded-full items-center justify-center"
								style={{ backgroundColor: appColors.primary }}
							>
								<AppText className="text-white font-bold text-4xl">{initials}</AppText>
							</View>
						)}
						<View
							className="absolute bottom-0 right-0 w-8 h-8 rounded-full items-center justify-center border-2 border-white"
							style={{ backgroundColor: appColors.primary }}
						>
							<Camera size={16} color="white" />
						</View>
					</TouchableOpacity>
					<AppText className="text-stone-500 text-sm">Toque na foto para alterar</AppText>
				</View>

				<AppForm
					control={control}
					render={({ Input }) => (
						<View className="gap-4">
							<Input name="username" label="Nome de usuário" placeholder="Seu nome de usuário" icon={{ left: UserIcon }} />
							<Input name="email" label="E-mail" placeholder="email@email.com" icon={{ left: Mail }} autoCapitalize="none" keyboardType="email-address" />
						</View>
					)}
				/>
			</KeyboardAwareScrollView>
		</AppModal>
	);
};

export const EditProfileModal = () => {
	const user = useAtomValue(userAtom);
	const setUser = useSetAtom(userAtom);
	const setMockUser = useSetAtom(mockUserAtom);
	const loginValues = useAtomValue(loginValuesAtom);
	const setLoginValues = useSetAtom(loginValuesAtom);
	const setVisible = useSetAtom(editProfileModalVisibleAtom);
	const { mutateAsync } = useAtomValue(updateUserAtom);
	const [picture, setPicture] = useState<string | null | undefined>(user?.profile_picture);

	const onSubmit = async (values: EditUserInput) => {
		try {
			const updated = await mutateAsync({
				...user,
				username: values.username,
				email: values.email,
				profile_picture: picture,
			} as User);
			setUser(updated);
			// Persiste o perfil no "registro" mock para sobreviver ao relogin
			// (senão username/foto voltariam ao padrão do login mock).
			setMockUser(updated);
			// Mantém as credenciais de login (mock) em sincronia: o email é usado
			// para autenticar, então sem isso o login continuaria com o email antigo.
			if (loginValues) setLoginValues({ ...loginValues, email: values.email });
			userToast.success.update();
			setVisible(false);
		} catch (error) {
			userToast.error.update((error as Error).message ?? String(error));
		}
	};

	return (
		<AppFormProvider
			resolver={zodResolver(editUserSchema)}
			onSubmit={onSubmit}
			defaultValues={{ username: user?.username ?? "", email: user?.email ?? "" }}
		>
			<EditProfileContent picture={picture} setPicture={setPicture} />
		</AppFormProvider>
	);
};
