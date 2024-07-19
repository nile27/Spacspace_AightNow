import { exchangeRate } from "./../lib/stockAction";
import { create } from "zustand";
import { persist } from "zustand/middleware";
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
  logintype: string;
  uid?: string;
};

export type TInputState = {
  inputText: TmemberText;
  setInput: (key: string, value: string) => void;
  addStock: (stock: string) => void;
  removeStock: (stock: string) => void;
  labelImg: string | null;
  imgFile: File | null;
  setLabelImg: (labelImg: string | null) => void;
  setImgFile: (imgFile: File | null) => void;
};

export type TUserData = {
  id: string;
  userId?: string;
  email: string;
  name: string;
  nickname: string;
  phone: string;
  birth: string;
  stock: string[];
  profile_image?: string;
  logintype?: string;
  language: string;
};

export type AuthStore = {
  user: TUserData | null;

  profile: string | null;
  setUser: (user: TUserData) => void;
  setProfile: (profile: string) => void;
  clearUser: () => void;
};
type TStockStore = {
  corporateOverview: string;
  stockExchangeType: string;
  compareToPreviousPrice: string;
};

type TExchangeStore = {
  isChange: boolean;
  setIsChange: (isChange: boolean) => void;
};

type TStockSearch = {
  stockWatchList: string;
  setStockWatchList: (watchList: string) => void;
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

export const useLoginStore = create<TLoginStore>()(
  persist(
    set => ({
      isLoggedIn: false,
      setLogin: () => set({ isLoggedIn: true }),
      setLogout: () => set({ isLoggedIn: false }),
    }),
    {
      name: "login-storage",
      getStorage: () => sessionStorage,
    },
  ),
);

export const useSignUp = create<TInputState>()(
  persist(
    set => ({
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
        logintype: "none",
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
      labelImg: null,
      imgFile: null,
      setLabelImg: labelImg => set({ labelImg }),
      setImgFile: imgFile => set({ imgFile }),
    }),
    {
      name: "signup-storage",
      getStorage: () => sessionStorage,
    },
  ),
);

export const useAuthStore = create(
  persist<AuthStore>(
    set => ({
      user: null,
      profile: null,
      setUser: user => set({ user }),
      clearUser: () => set({ user: null }),
      setProfile: profile => set({ profile }),
    }),
    {
      name: "auth-storage",
      getStorage: () => sessionStorage,
    },
  ),
);

export const useStockStore = create<TStockStore>(set => ({
  corporateOverview: "",
  stockExchangeType: "",
  compareToPreviousPrice: "",
}));

export const useExchange = create<TExchangeStore>(set => ({
  isChange: false,
  setIsChange: isChange => set({ isChange }),
}));

export const useWatchList = create<TStockSearch>(set => ({
  stockWatchList: "",
  setStockWatchList: stockWatchList => set({ stockWatchList }),
}));
