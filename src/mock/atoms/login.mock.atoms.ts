import { LoginCredentials } from "@/api/endpoints/auth.endpoint";
import { asyncStorage } from "@/utils/jotai-storage.utils";
import { atomWithStorage } from "jotai/utils";
import { AsyncStorage } from "jotai/vanilla/utils/atomWithStorage";

const loginCredKey = 'loginCred'


export const loginValuesAtom = atomWithStorage<LoginCredentials>(
    loginCredKey,
    {
        email: "teste@kinebot.com.br",
        password: "123456"
    },
    asyncStorage as AsyncStorage<LoginCredentials>
);