import { usePathname } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tab } from "./components/tab";
import { tabs } from "./tabs";

export default function BottomTabs() {
	const pathname = usePathname();
	const [selectedTab] = useMemo(() => {
		const matchingTab = tabs?.find((tab) => pathname.includes(tab.path.toString()));
		return [matchingTab ? matchingTab.path : null];
	}, [pathname]);
	const { bottom } = useSafeAreaInsets();

	return (
		<View className="bg-white rounded-xl w-full items-center flex-row justify-evenly" style={{ paddingBottom: bottom + 12, paddingTop: 12 }}>
			{tabs?.map((tab) => (
				<Tab key={tab.path.toString()} {...tab} selected={selectedTab === tab.path} />
			))}
		</View>
	);
}
