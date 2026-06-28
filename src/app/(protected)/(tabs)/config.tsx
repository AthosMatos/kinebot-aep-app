import { AppText } from "@/components/app-defaults/app-text";
import { ChevronRight } from "lucide-react-native";
import { PropsWithChildren, ReactNode, useState } from "react";
import { ScrollView, Switch, TouchableOpacity, View } from "react-native";

const SettingsGroup = ({ title, children }: PropsWithChildren<{ title: string; }>) => (
	<View className="gap-2">
		<AppText className="text-stone-500 text-xs uppercase font-bold px-1">{title}</AppText>
		<View className="bg-white rounded-2xl overflow-hidden border border-stone-200" >
			{children}
		</View>
	</View>
);

const SettingsRow = ({
	label,
	value,
	right,
	onPress,
}: {
	label: string;
	value?: string;
	right?: ReactNode;
	onPress?: () => void;
}) => {
	const content = (
		<View className="flex-row items-center justify-between px-4 py-4 border-b border-stone-100">
			<AppText className="text-black text-base">{label}</AppText>
			<View className="flex-row items-center gap-2">
				{value && <AppText className="text-stone-400">{value}</AppText>}
				{right}
			</View>
		</View>
	);
	if (onPress) return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
	return content;
};

export default function Config() {
	const [pushEnabled, setPushEnabled] = useState(true);
	const [emailEnabled, setEmailEnabled] = useState(false);

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			className="flex-1"
			contentContainerClassName="px-4 pt-8 pb-10 gap-6"
		>
			<AppText className="text-black font-bold text-2xl">Configurações</AppText>

			<SettingsGroup title="Notificações">
				<SettingsRow
					label="Notificações push"
					right={
						<Switch
							value={pushEnabled}
							onValueChange={setPushEnabled}
							trackColor={{ true: "#2F54EB" }}
						/>
					}
				/>
				<SettingsRow
					label="Notificações por e-mail"
					right={
						<Switch
							value={emailEnabled}
							onValueChange={setEmailEnabled}
							trackColor={{ true: "#2F54EB" }}
						/>
					}
				/>
			</SettingsGroup>

			<SettingsGroup title="Preferências">
				<SettingsRow
					label="Idioma"
					value="Português (BR)"
					right={<ChevronRight size={18} color="#A1A1A1" />}
					onPress={() => { }}
				/>
				<SettingsRow
					label="Tema"
					value="Automático"
					right={<ChevronRight size={18} color="#A1A1A1" />}
					onPress={() => { }}
				/>
			</SettingsGroup>

			<SettingsGroup title="Sobre">
				<SettingsRow label="Versão do app" value="1.0.0" />
				<SettingsRow label="Contato" value="suporte@kinebot.com.br" />
			</SettingsGroup>
		</ScrollView>
	);
}
