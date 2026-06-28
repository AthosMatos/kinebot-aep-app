import { authService, LoginCredentials, User } from "@/api/endpoints/auth.endpoint";
import { authTokenAtom, TOKEN_KEY } from "@/atoms/auth/token";
import { loginValuesAtom } from "@/mock/atoms/login.mock.atoms";
import { mockUserAtom } from "@/mock/atoms/user.mock.atoms";
import { StorageKeys } from "@/storage-keys";
import { secureStorage } from "@/utils/jotai-storage.utils";
import { atom } from "jotai";
import { atomWithMutation, queryClientAtom } from "jotai-tanstack-query";
import { unwrap } from "jotai/utils";
import { userAtom } from "../../auth/user";


// Persisted SecureStore keys that hold user-scoped data and must be wiped on logout.
const SECURE_STORAGE_USER_KEYS = [
    TOKEN_KEY,
    StorageKeys.userCredentials,
];

export const logoutAtom = atom(null, async (get, set) => {
    const queryClient = get(queryClientAtom);

    // 1) Cancelar e limpar TODAS as queries em cache (impede que dados do
    //    usuário anterior apareçam ao trocar de conta).
    if (queryClient) {
        try {
            await queryClient.cancelQueries();
        } catch {
            // ignore
        }
        queryClient.removeQueries();
        queryClient.clear();
    }

    // 2) Limpar atoms em memória ANTES de remover do storage para evitar que
    //    o atomWithStorage re-grave o valor null como string "null" no AsyncStorage
    //    (subscribers podem disparar setItem após o set).
    set(authTokenAtom, null);
    set(userAtom, null);

    // 4) Remover TODAS as chaves persistidas do usuário em paralelo.
    await Promise.all([
        ...SECURE_STORAGE_USER_KEYS.map((key) => secureStorage.removeItem(key)),

    ]);

    if (__DEV__) {
        console.log("[logoutAtom] User-scoped storage cleared");
    }
});

export const loginAtom = atomWithMutation(
    (get) => ({
        mutationKey: ["sessions"],
        mutationFn: (credentials: LoginCredentials) => {
            const loginValues = get(unwrap(loginValuesAtom))
            const storedUser = get(unwrap(mockUserAtom))
            return authService.login(credentials, loginValues, storedUser)
        },
        onSuccess: async () => {
            const queryClient = get(queryClientAtom);
            await queryClient.invalidateQueries();
        },
        onError: async (error) => {
            console.error("Login failed:", error);
        },
    }),
    (get) => get(queryClientAtom)
);

export const forgotPasswordAtom = atomWithMutation(
    () => ({
        mutationKey: ["forgotPassword"],
        mutationFn: (credentials: LoginCredentials) => authService.forgotPassword(credentials),
        onError: async (error) => {
            console.error("Forgot password failed:", error);
        },
    }),
    (get) => get(queryClientAtom)
);

export const updateUserAtom = atomWithMutation(
    () => ({
        mutationKey: ["updateUser"],
        mutationFn: (user: User) => authService.updateUser(user),
        onError: async (error) => {
            console.error("Update user failed:", error);
        },
    }),
    (get) => get(queryClientAtom)
);
