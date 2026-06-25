import { loginValues, mockToken } from "@/mock/login.mock";
import { sleep } from "@/utils/sleep.utils";

const ProfilePic = require("../../assets/profile_pic.jpg")

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
		await sleep(400)
		if (credentials.email === loginValues.email && credentials.password === loginValues.password) {
			return {
				token: mockToken,
				user: {
					email: loginValues.email,
					username: 'KineTeste',
					id: '123',
					profile_picture: ProfilePic
				}
			} as LoginResponse
		}
		throw 'Credenciais erradas'
		/* const response = await api.post<LoginResponse>("/login", credentials);
		return response.data; */
	}
};
