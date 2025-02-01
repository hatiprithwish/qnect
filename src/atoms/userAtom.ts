import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { UserData } from "../types";
import { atom } from "jotai/vanilla";

const storage = createJSONStorage<UserData | null>(() => sessionStorage);

// Main user atom with persistence
export const userAtom = atomWithStorage<UserData | null>(
  "userData", // storage key
  null, // default value
  storage
);

export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);
