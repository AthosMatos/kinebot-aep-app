import { AnalysesInput, analysesSchema } from "@/api/schemas/analyses.schema";
import { postAnalysisAtom } from "@/atoms/api/anayles/mutations";
import { AppFormProvider } from "@/contexts/form.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { AnalysesForm } from "./components/AnalysesForm";

export default function CreateAnalyse() {
    const { mutateAsync } = useAtomValue(postAnalysisAtom);
    const { isPending } = useAtomValue(postAnalysisAtom);

    const onSubmit = async (values: AnalysesInput) => {
        try {
            await mutateAsync({
                ...values,
                analysisDate: values.analysisDate?.toISOString(),
            });
            router.back();
        } catch {
            // toast shown by service
        }
    };

    return (
        <AppFormProvider resolver={zodResolver(analysesSchema)} onSubmit={onSubmit}>
            <AnalysesForm submitLabel="Criar análise" isPending={isPending} />
        </AppFormProvider>
    );
}
