import { loginInput, loginSchema } from "@/api/schemas/auth.schema";
import { useAuth } from "@/auth/auth.provider";
import { AppButton } from "@/components/app-defaults/app-button";
import { AppForm } from "@/components/form";
import { AppFormProvider, useAppFormContext } from "@/contexts/form.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Eye, EyeClosed, Lock, User } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
function Form() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);


	const { control, values, isValid, submit } = useAppFormContext<loginInput>();

	return (
		<KeyboardAwareScrollView contentContainerClassName="flex-1" bottomOffset={12}>
			<AppForm
				control={control}
				render={({ Input }) => (
					<View className="flex-1 px-3">
						<Input icon={{ left: User }} name="email" label="E-mail" />
						<Input icon={{ left: Lock, right: isPasswordVisible ? Eye : EyeClosed }} name="password" label="Senha" secureTextEntry={!isPasswordVisible} />
					</View>
				)}
			/>



			<View className="bg-black/80 p-4 flex-row justify-between items-center">

				<AppButton icon="checkmark" disabled={!isValid} onPress={submit} />
			</View>
		</KeyboardAwareScrollView>
	);
}


export default function Screen() {

	const { login: { signIn } } = useAuth();

	const onSubmit = (formvalues: loginInput) => {
		signIn(formvalues)
		router.back();
	};

	return (
		<AppFormProvider onSubmit={onSubmit} resolver={zodResolver(loginSchema)}>
			<Form />
		</AppFormProvider>
	);
}
