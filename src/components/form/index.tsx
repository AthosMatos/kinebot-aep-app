import { AppSelect, type SelectOption } from "@/components/app-defaults/app-select";
import { type DateInputProps, FormDateInput } from "@/components/form/inputs/date";
import { FormSwitch, type SwitchProps } from "@/components/form/inputs/switch";
import { FormInput, type FormInputProps } from "@/components/form/inputs/text";
import { ReactNode } from "react";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { CheckBoxProps, FormCheckBox } from "./inputs/checkbox";
import { FormCurrencyInput, type FormCurrencyInputProps } from "./inputs/currency";


type BoundSelectProps<T extends FieldValues> = Omit<
    React.ComponentProps<typeof AppSelect>,
    "value" | "onChange"
> & {
    name: Path<T>;
    options?: SelectOption[];
    modalTitle: string;
};

interface AppFormInputsProps<T extends FieldValues> {
    Input: (props: Omit<FormInputProps<T>, "control">) => React.ReactNode;
    DateInput: (props: Omit<DateInputProps<T>, "control">) => React.ReactNode;
    Switch: (props: Omit<SwitchProps<T>, "control">) => React.ReactNode;
    CheckBox: (props: Omit<CheckBoxProps<T>, "control">) => ReactNode
    Select: (props: BoundSelectProps<T>) => React.ReactNode;
    CurrencyInput: (props: Omit<FormCurrencyInputProps<T>, "control" | "value">) => React.ReactNode;
}

interface AppFormProps<T extends FieldValues> {
    control: Control<T>;
    render: (inputs: AppFormInputsProps<T>) => React.ReactNode;
}

export const AppForm = <T extends FieldValues>({ control, render }: AppFormProps<T>) => {
    return (
        <>
            {render({
                Input: (props) => <FormInput control={control} {...props} />,
                DateInput: (props) => <FormDateInput control={control} {...props} />,
                Switch: (props) => <FormSwitch control={control} {...props} />,
                Select: ({ name, ...props }) => (
                    <Controller
                        control={control}
                        name={name}
                        render={({ field }) => (
                            <AppSelect {...props} value={field.value} onChange={field.onChange} />
                        )}
                    />
                ),
                CurrencyInput: (props) => (
                    <FormCurrencyInput
                        prefix="R$"
                        delimiter="."
                        separator=","
                        precision={2}
                        control={control}
                        {...props}
                    />
                ),
                CheckBox: (props) => (
                    <FormCheckBox
                        control={control}
                        {...props}
                    />
                )
            })}
        </>
    );
};
