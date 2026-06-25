import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
	layoutContainer: {
		flex: 1,
	},
	logoContainer: {
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	contentContainer: {
		flex: 1,
		padding: 16,
	},
});

const Layout = ({ children }: { children: React.ReactNode }) => {

	return (
		<View
			style={styles.layoutContainer}
		>
			{children}
		</View>
	);
};

export default function ScreenLayout() {
	return (
		<Layout>
			<Stack
				screenOptions={{
					headerShown: false,
					animation: "ios_from_right",
					contentStyle: { backgroundColor: "transparent" },
				}}
			/>
		</Layout>
	);
}
