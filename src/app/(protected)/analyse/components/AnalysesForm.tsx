import { AnalysesInput } from "@/api/schemas/analyses.schema";
import { AppButton } from "@/components/app-defaults/app-button";
import { AppText } from "@/components/app-defaults/app-text";
import { AppForm } from "@/components/form";
import { appColors } from "@/constants/colors";
import { useAppFormContext } from "@/contexts/form.context";
import { useSetAtom } from "jotai";
import { ChevronRight } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { ResultModal } from "./resultModal";
import { resultModalVisibleAtom } from "./resultModal/atoms";

interface Props {
    submitLabel: string;
    isPending: boolean;
}

export const AnalysesForm = ({ submitLabel, isPending }: Props) => {
    const { control, isValid, submit, values } = useAppFormContext<AnalysesInput>();
    const setResultModalVisible = useSetAtom(resultModalVisibleAtom);
    const result = values.result ?? [];

    return (
        <View className="gap-6 pb-2 px-4 flex-1">
            <AppText className="text-black font-bold text-xl mt-6">Informações da análise</AppText>
            <KeyboardAwareScrollView
                contentContainerClassName="py-4"
                fadingEdgeLength={20}
                showsVerticalScrollIndicator={false}
                bottomOffset={24}>
                <View className="gap-6">
                    <AppForm
                        control={control}
                        render={({ Input, DateInput }) => (
                            <View className="gap-4">
                                <Input name="title" label="Título*" placeholder="Ex: Análise de ergonomia" />
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

                    <View className="gap-2">
                        <AppText className="text-black font-medium text-base">Resultado da análise</AppText>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setResultModalVisible(true)}
                            className="border rounded-xl p-4 flex-row items-center justify-between gap-3"
                            style={{ borderColor: appColors.neutral.light_medium, backgroundColor: "white" }}
                        >
                            {result.length ? (
                                <View className="flex-1 gap-2">
                                    {result.map((r) => (
                                        <View key={r.key} className="flex-row items-center gap-2">
                                            <View style={{ backgroundColor: r.color }} className="w-4 h-4 rounded" />
                                            <AppText className="flex-1 text-black">{r.label}</AppText>
                                            <AppText className="text-stone-500">{r.percentage}%</AppText>
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <AppText className="flex-1 text-stone-500">Definir resultado da análise</AppText>
                            )}
                            <ChevronRight size={20} color={appColors.neutral.medium} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <AppButton
                variant={isValid ? "default" : "disabled"}
                disabled={!isValid}
                isLoading={isPending}
                onPress={submit}
            >
                {submitLabel}
            </AppButton>

            <ResultModal />
        </View>
    );
};
