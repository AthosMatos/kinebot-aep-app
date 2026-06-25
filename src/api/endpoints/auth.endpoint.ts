import { api } from "../axios.config";

type LoginCredentials = {
	email: string;
	password: string;
};

export type User = {
	id?: string;
	username: string;
	email: string;
	profile_picture?: string | null;
};

export type LoginResponse = {
	token: string;
	user: User
};

export const authService = {
	async login(credentials: LoginCredentials) {
		const response = await api.post<LoginResponse>("/login", credentials);
		return response.data;
	}
};
