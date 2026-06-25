import { LucideIcon } from "lucide-react-native";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { TextInputProps, TouchableOpacity } from "react-native";
import { InputContainer, InputError, InputLabel, StyledInput, TextInputContainer } from "./styled";

export type FormInputProps<T extends FieldValues> = TextInputProps & {
	label: string;
	control: Control<T>;
	name: Path<T>;
	icon?: {
		left?: LucideIcon
		right?: LucideIcon
		onRightIconPress?: () => void
	}
};

export const FormInput = <T extends FieldValues>({ label, icon, control, name, ...rest }: FormInputProps<T>) => {
	const LeftIcon = icon?.left
	const RightIcon = icon?.right

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<InputContainer>
					{label && <InputLabel>{label}</InputLabel>}
					{error && <InputError>{error.message}</InputError>}
					<TextInputContainer>
						{LeftIcon ? <LeftIcon size={24} /> : null}
						<StyledInput {...rest} {...field} onChangeText={field.onChange} />
						{RightIcon ? <TouchableOpacity onPress={icon.onRightIconPress} disabled={!!icon.onRightIconPress}>
							<RightIcon size={24} />
						</TouchableOpacity> : null}
					</TextInputContainer>
				</InputContainer>
			)}
		/>
	);
};

export type FormInputType = typeof FormInput;