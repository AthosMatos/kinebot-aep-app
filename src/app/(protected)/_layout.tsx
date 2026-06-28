import { DefaultStack } from "@/components/defaultStack";
import BottomTabs from "@/components/layout/bottom-tabs";
import Header from "@/components/layout/header";
import { View } from "react-native";


function Layout() {
  return <View className="flex-1 bg-[#F8F8F8]">
    <Header />
    <DefaultStack />
    <BottomTabs />
  </View>

}

export default Layout;
