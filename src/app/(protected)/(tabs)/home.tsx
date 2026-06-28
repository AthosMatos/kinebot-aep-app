import { getAnalysesQueryAtom } from "@/atoms/api/anayles/query";
import { userAtom } from "@/atoms/auth/user";
import { AppButton } from "@/components/app-defaults/app-button";
import { AppText } from "@/components/app-defaults/app-text";
import { LazyLoad } from "@/components/LazyLoad";
import { appColors } from "@/constants/colors";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { FolderOpen } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { AnalyseCard } from "./analyses/components/AnalyseCard";

export default function Home() {
	const user = useAtomValue(userAtom);
	const { data: analyses, isLoading } = useAtomValue(getAnalysesQueryAtom());

	const total = analyses?.length ?? 0;
	const recent = analyses?.slice(-3).reverse() ?? [];

	return (
		<LazyLoad loading={isLoading}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				className="flex-1"
				contentContainerClassName="px-4 pt-8 pb-10 gap-6"
			>
				<View className="gap-1">
					<AppText className="text-stone-500">Bem-vindo,</AppText>
					<AppText className="text-black font-bold text-2xl">{user?.username ?? "Usuário"}</AppText>
				</View>

				<View className="bg-white rounded-2xl p-6 gap-2" style={{ elevation: 2 }}>
					<View className="flex-row items-center gap-2">
						<FolderOpen color={appColors.primary} size={20} />
						<AppText className="text-stone-500 text-sm">Total de análises</AppText>
					</View>
					<AppText className="font-bold text-5xl" style={{ color: appColors.primary }}>
						{total}
					</AppText>
				</View>

				<View className="gap-4">
					<AppText className="text-black font-bold text-lg">Análises recentes</AppText>
					{recent.length === 0 ? (
						<AppText className="text-stone-400">Nenhuma análise registrada</AppText>
					) : (
						<View className="gap-3">
							{recent.map((a) => (
								<AnalyseCard key={a.id} {...a} />
							))}
						</View>
					)}
					<AppButton variant="outline" onPress={() => router.navigate("/(protected)/(tabs)/analyses")}>
						Ver todas as análises
					</AppButton>
				</View>
			</ScrollView>
		</LazyLoad>
	);
}
