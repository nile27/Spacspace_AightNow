import { create } from "zustand";

type TStore = {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  watchList: number[];
};

export const useShow = create<TStore>()(set => ({
  isShow: false,
  setIsShow: isShow => set({ isShow }),
  watchList: [],
}));
