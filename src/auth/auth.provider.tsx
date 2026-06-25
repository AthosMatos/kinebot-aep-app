import { loginInput } from "@/api/schemas/auth.schema";
import { useNetInfo } from "@react-native-community/netinfo";
import * as SplashScreen from "expo-splash-screen";
import { useAtomValue, useSetAtom } from "jotai";
import { queryClientAtom } from "jotai-tanstack-query";
import {
	createContext,
	type PropsWithChildren,
	use,
	useCallback,
	useEffect,
	useMemo,
	useState
} from "react";
import { setLogoutCallback } from "../api/axios.config";
import { loginAtom, logoutAtom } from "../atoms/auth/mutations";
import { useAuthStates } from "./use-auth-states";

interface AuthContextProps {
	login: {
		isPending: boolean;
		error: unknown;
		signIn: (formValues: loginInput) => Promise<void>;
	};
	logout: {
		isPending: boolean;
		error: unknown;
		signOut: () => Promise<void>;
	};
	isLoggedIn: boolean;
	isConnected: boolean;
	setShouldSaveUser: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextProps | null>(null);

// Use this hook to access the user info.
export function useAuth() {
	const value = use(AuthContext);
	if (!value) {
		throw new Error("useAuth must be wrapped in a <AuthSessionProvider />");
	}

	return value;
}

SplashScreen.preventAutoHideAsync();

export function AuthProvider({ children }: PropsWithChildren) {
	const [isMounted, setIsMounted] = useState(false);
	const [shouldSaveUser, setShouldSaveUser] = useState(false)

	const logout = useSetAtom(logoutAtom);

	const {
		mutateAsync: loginAsync,
		isPending: loginIsPending,
		error: loginError,
	} = useAtomValue(loginAtom);
	const queryClient = useAtomValue(queryClientAtom);

	const { saveAuthStates, authToken } = useAuthStates();
	const netInfo = useNetInfo();

	const isConnected = useMemo(() => !!netInfo.isConnected, [netInfo.isConnected]);
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const signIn = useCallback(
		async (formValues: loginInput) => {
			try {
				if (queryClient) {
					queryClient.removeQueries();
					queryClient.clear();
				}
				const { token, user } = await loginAsync({
					email: formValues.email,
					password: formValues.password,
				});

				console.log("Login bem-sucedido:", token, user);

				// Salvar estados de autenticação com jotai storage
				if (shouldSaveUser) saveAuthStates({ token, user });
				setIsLoggedIn(true)
				//router.dismissAll();
			} catch (error) {
				throw error;
			}
		},
		[queryClient, shouldSaveUser]
	);

	const signOut = useCallback(async () => {
		try {
			setIsLoggedIn(false)
			// logoutAtom já cancela/limpa o queryClient e remove TODAS as chaves
			// persistidas do usuário (token, user, address, credenciais, etc).
			await logout();
		} catch (error) {
			if (__DEV__) {
				console.error("[AuthProvider] Erro ao fazer logout:", error);
			}
		}
	}, []);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Register the logout callback for the axios 401 interceptor
	useEffect(() => {
		setLogoutCallback(signOut);

		return () => {
			setLogoutCallback(null);
		};
	}, [signOut]);


	useEffect(() => {
		if (isMounted) {
			setTimeout(() => {
				SplashScreen.hideAsync().catch((e) => {
					console.warn("Erro ao esconder splash screen:", e);
				});
			}, 500);
		}
	}, [isMounted]);


	useEffect(() => {
		authToken && setIsLoggedIn(true)
	}, [authToken])

	return (
		<AuthContext.Provider
			value={{
				login: {
					isPending: loginIsPending,
					error: loginError,
					signIn,

				},
				logout: {
					isPending: false,
					error: null,
					signOut,
				},
				isLoggedIn,
				isConnected,
				setShouldSaveUser
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
