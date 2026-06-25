import { loginInput, loginSchema } from "@/api/schemas/auth.schema";
import { useAuth } from "@/auth/auth.provider";
import { AppButton } from "@/components/app-defaults/app-button";
import { AppForm } from "@/components/form";
import { AppFormProvider, useAppFormContext } from "@/contexts/form.context";
import { authToast } from "@/toasts/auth.toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { Eye, EyeClosed, Lock, User } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";

const LogoHorizontal = require("../../assets/logo_horizontal.png")


function Form() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const { login: { isPending }, setShouldSaveUser } = useAuth();
	const { control, isValid, submit, values } = useAppFormContext<loginInput>();

	useEffect(() => {
		setShouldSaveUser(values.shouldPersist)
	}, [values.shouldPersist])

	return (

		<View className="pl-24 pb-24 pt-14 pr-8 justify-between h-full absolute w-full items-end" >
			<Image style={{ width: 60, height: 254, right: 0, }} source={LogoHorizontal} />

			<View className="gap-8 w-full">
				<AppForm
					control={control}
					render={({ Input, CheckBox }) => (
						<View className="px-3 gap-4 w-full">
							<Input placeholder="email@email.com" icon={{ left: User }} name="email" label="E-mail" />
							<Input placeholder="Digite sua senha" icon={{ left: Lock, right: isPasswordVisible ? Eye : EyeClosed, onRightIconPress: () => setIsPasswordVisible((prev) => !prev) }} name="password" label="Senha" secureTextEntry={!isPasswordVisible} />
							<CheckBox name="shouldPersist" label="Lembrar de mim" />
						</View>
					)}
				/>

				<AppButton isLoading={isPending} disabled={!isValid} className="w-52 self-center" variant="default" onPress={submit} >
					Login
				</AppButton>

				<AppButton disabled={isPending} className="w-52 self-center" variant="transparent" /* onPress={submit} */ >
					Esqueceu a senha?
				</AppButton>
			</View>
		</View>


	);
}


export default function Screen() {

	const { login: { signIn, error } } = useAuth();

	const onSubmit = (formvalues: loginInput) => {
		signIn(formvalues)
	};

	useEffect(() => {
		error && authToast.wrongCredentials(error as string)
	}, [error])

	return (
		<AppFormProvider defaultValues={{ shouldPersist: true }} onSubmit={onSubmit} resolver={zodResolver(loginSchema)}>
			<Form />
		</AppFormProvider>
	);
}
