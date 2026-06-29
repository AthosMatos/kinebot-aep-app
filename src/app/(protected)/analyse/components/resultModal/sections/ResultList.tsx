import { useAtomValue } from "jotai";
import { View } from "react-native";
import { resultDraftAtom } from "../atoms";
import { ResultRow } from "../components/ResultRow";

export const ResultList = () => {
	const draft = useAtomValue(resultDraftAtom);

	if (!draft.length) return null;

	return (
		<View className="gap-3">
			{draft.map((r) => (
				<ResultRow key={r.key} result={r} />
			))}
		</View>
	);
};
