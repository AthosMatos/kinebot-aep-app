import { AnalysesInput } from "@/api/schemas/analyses.schema";
import { AppButton } from "@/components/app-defaults/app-button";
import { AppText } from "@/components/app-defaults/app-text";
import { AppForm } from "@/components/form";
import { useAppFormContext } from "@/contexts/form.context";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

interface Props {
    submitLabel: string;
    isPending: boolean;
}

export const AnalysesForm = ({ submitLabel, isPending }: Props) => {
    const { control, isValid, submit } = useAppFormContext<AnalysesInput>();

    return (
        <View className="gap-6 px-4 flex-1">
            <AppText className="text-black font-bold text-xl mt-6">Informações da análise</AppText>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} bottomOffset={24}>
                <AppForm
                    control={control}
                    render={({ Input, DateInput }) => (
                        <View className="gap-4">
                            <Input name="title" label="Título" placeholder="Ex: Análise de ergonomia" />
                            <Input name="company" label="Empresa" placeholder="Nome da empresa" />
                            <Input name="industrialPlant" label="Planta Industrial" placeholder="Ex: Planta 1" />
                            <Input name="sector" label="Setor" placeholder="Ex: Montagem" />
                            <Input name="workstation" label="Posto de trabalho" placeholder="Ex: Operador de máquina" />
                            <Input name="activity" label="Atividade" placeholder="Ex: Montagem de peças" />
                            <Input name="evaluator" label="Avaliador" placeholder="Nome do avaliador" />
                            <DateInput name="analysisDate" label="Data de análise" placeholder="Selecione uma data" />
                        </View>
                    )}
                />
            </KeyboardAwareScrollView>
            <AppButton
                variant={isValid ? "default" : "disabled"}
                disabled={!isValid}
                isLoading={isPending}
                onPress={submit}
            >
                {submitLabel}
            </AppButton>
        </View>
    );
};
