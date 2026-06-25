import { jotaiStore } from "@/atoms/store";
import { modals } from "@/modals/modals";
import { QueryProvider } from "@/query-provider";
import { Provider as JotaiProvider } from "jotai";
import { Text, View } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";
import { AuthProvider, useAuth } from "../auth/auth.provider";

// Custom toast configuration
const toastConfig = {
  success: (props: any) => (
    <View style={{ backgroundColor: '#4CAF50', padding: 16, borderRadius: 10 }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.text1}</Text>
      {props.text2 && <Text style={{ color: 'white' }}>{props.text2}</Text>}
    </View>
  ),
  // Override other toast types as needed
}

function RootNavigator() {
  const { isLoggedIn } = useAuth();

  console.log(isLoggedIn)

  return (
    <SafeAreaView className="flex-1 bg-neutral-dark">
      {/* <AppGradientView colors={['#af3636', '#FFFFFF']}>
         <Stack
          screenOptions={{
            headerShown: false,
            animation: "ios_from_right",
            contentStyle: { backgroundColor: "transparent" },
          }}
        >
          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(protected)" />
          </Stack.Protected>
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
        </Stack>
      </AppGradientView> */}
    </SafeAreaView>

  );
}

function RootLayout() {
  return (
    <JotaiProvider store={jotaiStore}>
      <QueryProvider>
        <AuthProvider>
          <KeyboardProvider>
            <RootNavigator />
            <ToastManager config={toastConfig} position="top" useModal={false} showProgressBar showCloseIcon />
            {modals.map((ModalComponent) => ModalComponent)}
          </KeyboardProvider>
        </AuthProvider>
      </QueryProvider>
    </JotaiProvider>
  );
}

export default RootLayout;
