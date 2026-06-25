import BottomTabs from "@/components/layout/bottom-tabs";
import { Slot } from "expo-router";
import { View } from "react-native";


function Layout() {
  return <View className="flex-1 ">
    <Slot />
    <BottomTabs />
  </View>

}

export default Layout;
