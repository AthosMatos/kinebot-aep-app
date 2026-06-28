import { User } from "@/api/endpoints/auth.endpoint";
import { asyncStorage } from "@/utils/jotai-storage.utils";
import { atomWithStorage } from "jotai/utils";
import { AsyncStorage } from "jotai/vanilla/utils/atomWithStorage";

const mockUserKey = 'mockUser'

// "Registro" persistido do usuário no servidor mock. Sobrevive ao logout
// (assim como loginValuesAtom) para que edições de perfil persistam no relogin.
export const mockUserAtom = atomWithStorage<User | null>(
    mockUserKey,
    null,
    asyncStorage as AsyncStorage<User | null>
);
