import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";

interface LazyLoadProps {
	children: React.ReactNode;
	placeholder?: React.ReactNode;
	debugForceLoad?: boolean;
	loading?: boolean;
}

export const LazyLoad = ({ children, placeholder, debugForceLoad, loading }: LazyLoadProps) => {
	const [hasActivated, setHasActivated] = useState(false);

	useFocusEffect(
		useCallback(() => {
			setHasActivated(true);
		}, [])
	);

	const showLoading = useMemo(() => {
		if (debugForceLoad) return true;
		if (loading) return true;
		if (!hasActivated) return true;
		return false;
	}, [debugForceLoad, hasActivated, loading]);


	return (
		<>
			{showLoading ? (placeholder ??
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size={44} />
				</View>
			) : (
				children
			)}
		</>
	);
};
