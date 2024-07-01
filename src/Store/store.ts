import { create } from "zustand";

type TStore = {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
};

type TLoginStore = {
  isLoggedIn: boolean;
  setLogin: () => void;
};

export const useShow = create<TStore>()(set => ({
  isShow: false,
  setIsShow: isShow => set({ isShow }),
}));

export const useLoginStore = create<TLoginStore>(set => ({
  isLoggedIn: false,
  setLogin: () => set({ isLoggedIn: true }),
  // logout: () => set({ isLoggedIn: false }),
}));
