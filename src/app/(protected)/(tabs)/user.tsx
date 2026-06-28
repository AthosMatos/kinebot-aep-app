import { userAtom } from "@/atoms/auth/user";
import { useAuth } from "@/auth/auth.provider";
import { AppButton } from "@/components/app-defaults/app-button";
import { AppText } from "@/components/app-defaults/app-text";
import { appColors } from "@/constants/colors";
import { useAtomValue } from "jotai";
import { ReactNode } from "react";
import { Image } from "expo-image";
import { ScrollView, View } from "react-native";

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
	<View className="flex-row justify-between items-center px-4 py-4 border-b border-stone-100">
		<AppText className="text-stone-500">{label}</AppText>
		<AppText className="text-black font-medium">{value ?? "—"}</AppText>
	</View>
);

export default function UserScreen() {
	const user = useAtomValue(userAtom);
	const { logout: { signOut, isPending } } = useAuth();

	const initials = user?.username?.charAt(0).toUpperCase() ?? "?";

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			className="flex-1"
			contentContainerClassName="px-4 pt-8 pb-10 gap-6"
		>
			<AppText className="text-black font-bold text-2xl">Perfil</AppText>

			<View className="bg-white rounded-2xl p-6 items-center gap-4" style={{ elevation: 1 }}>
				{user?.profile_picture ? (
					<Image
						source={user.profile_picture}
						style={{ width: 80, height: 80, borderRadius: 40 }}
					/>
				) : (
					<View
						className="w-20 h-20 rounded-full items-center justify-center"
						style={{ backgroundColor: appColors.primary }}
					>
						<AppText className="text-white font-bold text-3xl">{initials}</AppText>
					</View>
				)}
				<View className="items-center gap-1">
					<AppText className="text-black font-bold text-xl">{user?.username}</AppText>
					<AppText className="text-stone-500">{user?.email}</AppText>
				</View>
			</View>

			<View className="bg-white rounded-2xl overflow-hidden" style={{ elevation: 1 }}>
				<InfoRow label="Nome de usuário" value={user?.username} />
				<InfoRow label="E-mail" value={user?.email} />
				<InfoRow label="ID" value={user?.id} />
			</View>

			<AppButton variant="delete" isLoading={isPending} onPress={signOut}>
				Sair da conta
			</AppButton>
		</ScrollView>
	);
}
