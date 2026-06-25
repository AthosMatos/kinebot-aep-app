import { createContext, useContext, useEffect } from "react";
import {
    type Control,
    type DefaultValues,
    type FieldValues,
    type Resolver,
    type UseFormGetValues,
    useForm
} from "react-hook-form";

export interface FormContextValue<T extends FieldValues> {
    control: Control<T>;
    isValid: boolean;
    submit: () => void;
    getValues: UseFormGetValues<T>;
    values: T;
}

export const FormContext = createContext<FormContextValue<any> | undefined>(undefined);

interface FormProviderProps<T extends FieldValues> {
    children: React.ReactNode;
    onSubmit: (data: T) => void;
    resolver: Resolver<T>;
    defaultValues?: DefaultValues<T>;
}

export const AppFormProvider = <T extends FieldValues>({
    children,
    onSubmit,
    resolver,
    defaultValues,
}: FormProviderProps<T>) => {
    const {
        handleSubmit,
        control,
        formState: { isValid },
        getValues,
        watch,
        trigger,
    } = useForm<T>({ resolver, mode: "onChange", defaultValues });

    // When editing an existing record, defaultValues are pre-filled but validation
    // hasn't run yet, so isValid starts false. Trigger it once on mount to fix that.
    useEffect(() => {
        if (defaultValues) trigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const values = watch();
    return (
        <FormContext.Provider
            value={{
                control: control as Control<any>,
                isValid,
                submit: handleSubmit(onSubmit),
                getValues,
                values,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

export const useAppFormContext = <T extends FieldValues>() => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useAppFormContext must be used within a FormProvider");
    }
    return context as FormContextValue<T>;
};
