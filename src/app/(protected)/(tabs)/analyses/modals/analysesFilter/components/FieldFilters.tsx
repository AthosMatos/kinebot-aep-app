import { AppForm } from "@/components/form";
import { View } from "react-native";
import { useAnalysesFilterForm } from "../context";
import { SectionLabel } from "./SectionLabel";

export const FieldFilters = () => {
	const { control } = useAnalysesFilterForm();

	return (
		<View className="gap-3">
			<SectionLabel>Filtros</SectionLabel>
			<AppForm
				control={control}
				render={({ Input }) => (
					<View className="gap-3">
						<Input name="company" label="Empresa" placeholder="Filtrar por empresa..." autoCapitalize="none" />
						<Input name="evaluator" label="Avaliador" placeholder="Filtrar por avaliador..." autoCapitalize="none" />
						<Input name="sector" label="Setor" placeholder="Filtrar por setor..." autoCapitalize="none" />
						<Input name="workstation" label="Posto de trabalho" placeholder="Filtrar por posto de trabalho..." autoCapitalize="none" />
					</View>
				)}
			/>
		</View>
	);
};
