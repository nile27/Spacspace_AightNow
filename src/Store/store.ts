import { create } from "zustand";

type TShoStore = {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  watchList: string[];
  setWatchList: (watchList: string[]) => void;
};

type TLoginStore = {
  isLoggedIn: boolean;
  setLogin: () => void;
  setLogout: () => void;
};

type TCloseStore = {
  isClose: boolean;
  setIsClose: (isClose: boolean) => void;
};

type TRemoveStore = {
  removeFromWatchList: (id: number) => void;
};

export type TmemberText = {
  id: string;
  email: string;
  pw: string;
  pwCheck: string;
  phone: string;
  birth: string;
  nickname: string;
  name: string;
  stock: string[];
};

export type TInputState = {
  inputText: TmemberText;
  setInput: (key: string, value: string) => void;
  addStock: (stock: string) => void;
  removeStock: (stock: string) => void;
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

export const useLoginStore = create<TLoginStore>(set => ({
  isLoggedIn: false,
  setLogin: () => set({ isLoggedIn: true }),
  setLogout: () => set({ isLoggedIn: false }),
}));

export const useSignUp = create<TInputState>(set => ({
  inputText: {
    id: "",
    pw: "",
    name: "",
    pwCheck: "",
    phone: "",
    birth: "",
    nickname: "",
    email: "",
    stock: [],
  },
  setInput: (key: string, value: string) =>
    set(state => ({
      inputText: {
        ...state.inputText,
        [key]: value,
      },
    })),
  addStock: (stock: string) =>
    set(state => ({
      inputText: {
        ...state.inputText,
        stock: [...state.inputText.stock, stock],
      },
    })),
  removeStock: (stock: string) =>
    set(state => ({
      inputText: {
        ...state.inputText,
        stock: state.inputText.stock.filter(item => item !== stock),
      },
    })),
}));
