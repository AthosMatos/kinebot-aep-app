import { authTokenAtom } from "@/atoms/auth/token";
import { useAtom, useSetAtom } from "jotai";
import type { User } from "../api/endpoints/auth.endpoint";
import { userAtom } from "../atoms/auth/user";

export const useAuthStates = () => {
	const [authToken, setAuthToken] = useAtom(authTokenAtom);
	const setUser = useSetAtom(userAtom);

	const saveAuthStates = ({ token, user }: { token?: string; user: User }) => {
		token && setAuthToken(token);
		setUser(user);
	};

	return { authToken, saveAuthStates };
};
