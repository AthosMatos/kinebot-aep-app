import { AppText } from "@/components/app-defaults/app-text"
import { formatToBrazilianDate } from "@/utils/date.utils"
import { View } from "react-native"
import { useAnalyseDataContext } from "../context"

interface InfoProps {
    label: string
    value?: string
}


const Info = ({ label, value }: InfoProps) => {
    return <View className="flex-row">
        <AppText className="text-black font-bold text-base">{label}: </AppText>
        <AppText className="text-black text-base">{value}</AppText>
    </View>
}


export const AnalyseInfo = () => {
    const { data } = useAnalyseDataContext()

    return <View className="gap-1">
        <Info label="Empresa" value={data?.company} />
        <Info label="Planta Industrial" value={data?.industrialPlant} />
        <Info label="Setor" value={data?.sector} />
        <Info label="Posto de trabalho" value={data?.workstation} />
        <Info label="Atividade" value={data?.activity} />
        <Info label="Avaliador" value={data?.evaluator} />
        <Info label="Data de análise" value={formatToBrazilianDate(data?.analysisDate)} />
    </View>
}