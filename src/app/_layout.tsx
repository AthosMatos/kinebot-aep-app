import { jotaiStore } from "@/atoms/store";
import { AppGradientView } from "@/components/app-defaults/app-gradient-view";
import { QueryProvider } from "@/query-provider";
import "@root/global.css";
import { Stack } from "expo-router";
import { Provider as JotaiProvider } from "jotai";
import { Text } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import ToastManager from "toastify-react-native";
import { AuthProvider, useAuth } from "../auth/auth.provider";

// Custom toast configuration
const toastConfig = {
  default: (props: any) => (
    <Animated.View entering={SlideInUp.springify()} exiting={SlideOutUp} className="bg-white border-2 border-primary p-4 px-4 rounded-xl" >
      <Text className="text-primary font-bold text-xl">{props.text1}</Text>
      {props.text2 && <Text className="text-black" >{props.text2}</Text>}
    </Animated.View>
  ),
  // Override other toast types as needed
}

function RootNavigator() {
  const { isLoggedIn } = useAuth();

  return (
    <AppGradientView start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 1 }} colors={['#D9D9D9', '#FFFFFF']}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(protected)" />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </AppGradientView>
  );
}

function RootLayout() {
  return (
    <JotaiProvider store={jotaiStore}>
      <QueryProvider>
        <AuthProvider>
          <KeyboardProvider>
            <RootNavigator />
            <ToastManager animationStyle={'slide'} config={toastConfig} position="top" useModal={false} showProgressBar showCloseIcon />
            {/* {modals.map((ModalComponent) => ModalComponent)} */}
          </KeyboardProvider>
        </AuthProvider>
      </QueryProvider>
    </JotaiProvider>
  );
}

export default RootLayout;
