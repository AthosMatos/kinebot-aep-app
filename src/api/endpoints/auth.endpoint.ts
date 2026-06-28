import { mockToken } from "@/mock/login.mock";
import { sleep } from "@/utils/sleep.utils";

const ProfilePic = require("../../assets/profile_pic.jpg")

export type LoginCredentials = {
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
	async login(credentials: LoginCredentials, loginValues?: LoginCredentials | null, storedUser?: User | null) {
		if (!loginValues) return
		await sleep(400)
		if (credentials.email === loginValues.email && credentials.password === loginValues.password) {
			// Usa o perfil persistido (edições anteriores) se existir; o email da
			// credencial é a fonte da verdade. Caso contrário, cai no perfil padrão.
			const user: User = storedUser
				? { ...storedUser, email: loginValues.email }
				: {
					email: loginValues.email,
					username: 'KineTeste',
					id: '123',
					profile_picture: ProfilePic
				}
			return { token: mockToken, user } as LoginResponse
		}
		throw 'Credenciais erradas'
		/* const response = await api.post<LoginResponse>("/login", credentials);
		return response.data; */
	},
	async forgotPassword(credentials: LoginCredentials) {
		await sleep(400)
		// Mock: returns the new credentials so the caller can persist them.
		return credentials
		/* const response = await api.post("/forgot-password", credentials);
		return response.data; */
	},
	async updateUser(user: User) {
		await sleep(400)
		// Mock: returns the updated user so the caller can persist it.
		return user
		/* const response = await api.put<User>("/user", user);
		return response.data; */
	}
};
