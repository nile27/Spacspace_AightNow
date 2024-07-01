import { create } from "zustand";

type TShoStore = {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  watchList: string[];
  setWatchList: (watchList: string[]) => void;
};

type TCloseStore = {
  isClose: boolean;
  setIsClose: (isClose: boolean) => void;
};

type TRemoveStore = {
  removeFromWatchList: (id: number) => void;
};

export const useShow = create<TShoStore>()(set => ({
  isShow: false,
  setIsShow: isShow => set({ isShow }),
  watchList: [],
  setWatchList: watchList => set({ watchList }),
}));

export const useClose = create<TCloseStore>()(set => ({
  isClose: false,
  setIsClose: isClose => set({ isClose }),
}));
