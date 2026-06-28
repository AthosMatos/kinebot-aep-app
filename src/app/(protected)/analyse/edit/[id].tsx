import { Analyse } from "@/api/endpoints/analyses.endpoints";
import { AnalysesInput, analysesSchema } from "@/api/schemas/analyses.schema";
import { invalidadeAnalyseById } from "@/atoms/api/anayles/invalidate";
import { putAnalysisAtom } from "@/atoms/api/anayles/mutations";
import { getAnalysesbyIdQueryAtom } from "@/atoms/api/anayles/query";
import { AppText } from "@/components/app-defaults/app-text";
import { LazyLoad } from "@/components/LazyLoad";
import { AppFormProvider } from "@/contexts/form.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { useAtomValue } from "jotai";
import { View } from "react-native";
import { AnalysesForm } from "../components/AnalysesForm";


function EditContent({ data }: { data: Analyse }) {
    const { mutateAsync, isPending } = useAtomValue(putAnalysisAtom);

    const defaultValues: AnalysesInput = {
        title: data.title ?? "",
        company: data.company,
        industrialPlant: data.industrialPlant,
        sector: data.sector,
        workstation: data.workstation,
        activity: data.activity,
        evaluator: data.evaluator,
        analysisDate: data.analysisDate ? new Date(data.analysisDate) : undefined,
    };

    const onSubmit = async (values: AnalysesInput) => {
        try {
            await mutateAsync({
                id: data.id,
                body: { ...values, analysisDate: values.analysisDate?.toISOString() },
            });
            invalidadeAnalyseById(data.id)
            router.back();
        } catch {
            // toast shown by service
        }
    };

    return (
        <AppFormProvider resolver={zodResolver(analysesSchema)} onSubmit={onSubmit} defaultValues={defaultValues}>
            <AnalysesForm submitLabel="Salvar alterações" isPending={isPending} />
        </AppFormProvider>
    );
}

export default function EditAnalyse() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data, isLoading } = useAtomValue(getAnalysesbyIdQueryAtom(id));

    return (
        <LazyLoad loading={isLoading}>
            {data ? <EditContent data={data} /> : <View className="flex-1 items-center justify-center">
                <AppText>
                    Não foi possivel carregar os dados. Tente novamente mais tarde
                </AppText>
            </View>}
        </LazyLoad>
    );
}
