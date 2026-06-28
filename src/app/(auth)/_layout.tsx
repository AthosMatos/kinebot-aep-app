import { LoginLayout } from "@/components/login/login-layout";
import { Stack } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScreenLayout() {
	return (
		<KeyboardAwareScrollView contentContainerClassName="flex-1">
			<LoginLayout />

			<SafeAreaView className="flex-1">
				<Stack
					screenOptions={{
						headerShown: false,
						animation: "slide_from_right",
						contentStyle: { backgroundColor: "transparent" },
					}}
				/>
			</SafeAreaView>
		</KeyboardAwareScrollView>
	);
}
