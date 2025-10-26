import { atom } from "jotai";

export const userNameAtom = atom<string | null>(null);
export const openLoginCardAtom = atom<boolean>(false);
export const openLoginMasterCardAtom = atom<boolean>(false);
export const isLoggedInAtom = atom<boolean>(false);
export const isMasterLoggedInAtom = atom<boolean>(false);
