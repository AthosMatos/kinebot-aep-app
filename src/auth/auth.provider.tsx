import { forgotPasswordInput, loginInput } from "@/api/schemas/auth.schema";
import { loginValuesAtom } from "@/mock/atoms/login.mock.atoms";
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
import { forgotPasswordAtom, loginAtom, logoutAtom } from "../atoms/api/auth/mutations";
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
	forgotPassword: {
		isPending: boolean;
		error: unknown;
		resetPassword: (formValues: forgotPasswordInput) => Promise<void>;
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
	const setLoginValues = useSetAtom(loginValuesAtom);

	const {
		mutateAsync: loginAsync,
		isPending: loginIsPending,
		error: loginError,
	} = useAtomValue(loginAtom);
	const {
		mutateAsync: forgotPasswordAsync,
		isPending: forgotPasswordIsPending,
		error: forgotPasswordError,
	} = useAtomValue(forgotPasswordAtom);
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
				const response = await loginAsync({
					email: formValues.email,
					password: formValues.password,
				});

				// Sem credenciais armazenadas (mock): nada a autenticar.
				if (!response) return;

				const { token, user } = response;

				console.log("Login bem-sucedido:", token, user);

				// Salvar estados de autenticação com jotai storage
				saveAuthStates({ token: shouldSaveUser ? token : undefined, user });
				setIsLoggedIn(true)
				//router.dismissAll();
			} catch (error) {
				throw error;
			}
		},
		[queryClient, shouldSaveUser]
	);

	const resetPassword = useCallback(
		async (formValues: forgotPasswordInput) => {
			const credentials = await forgotPasswordAsync({
				email: formValues.email,
				password: formValues.password,
			});
			// Mock: persist the new credentials so the next login uses them.
			setLoginValues(credentials ?? { email: formValues.email, password: formValues.password });
		},
		[]
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
				forgotPassword: {
					isPending: forgotPasswordIsPending,
					error: forgotPasswordError,
					resetPassword,
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
