import { atomWithStorage } from "jotai/utils";
import type { AsyncStorage } from "jotai/vanilla/utils/atomWithStorage";
import type { User } from "../../api/endpoints/auth.endpoint";
import { asyncStorage } from "../../utils/jotai-storage.utils";

const USER_KEY = "auth_user";

export const userAtom = atomWithStorage<User | null>(
	USER_KEY,
	null,
	asyncStorage as AsyncStorage<User | null>
);
