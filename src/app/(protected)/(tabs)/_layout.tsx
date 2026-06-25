import { Tabs } from 'expo-router';

export default function ScreenLayout() {
	return <Tabs

	/* screenOptions={{
		animation: "shift",
		headerShown: false,
		tabBarStyle: { display: "none" },
		sceneStyle: { backgroundColor: "transparent" },
	}} */
	>
		<Tabs.Screen name="home" />
	</Tabs>
}
