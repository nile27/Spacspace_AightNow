import fireStore from "@/firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  documentId,
  doc,
} from "firebase/firestore";
import { create } from "zustand";

type TFindStore = {
  searchHistory: any[];
  addSearchHistory: (
    userId: string,
    term: string,
    time: string,
    isNews: boolean,
    slug: string,
  ) => void;
  getSearchHistory: (userId: string) => void;
  deleteSearchHistory: (id: string) => void;
  deleteAllSearchHistory: (userId: string) => void;
};

export const useFindStore = create<TFindStore>(set => ({
  searchHistory: [],

  addSearchHistory: async (
    userId: string,
    term: string,
    time: string,
    isNews: boolean,
    slug: string,
  ) => {
    const historyRef = collection(fireStore, "searchHistory");
    //   const timestamp = Timestamp.fromDate(new Date(time)); // time을 Date 객체로 변환하여 Timestamp로 저장
    await addDoc(historyRef, { userId, term, time, isNews, slug });
  },

  getSearchHistory: async (userId: string) => {
    const historyRef = collection(fireStore, "searchHistory");
    const q = query(historyRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    set({ searchHistory: data });
  },

  deleteSearchHistory: async (id: string) => {
    const docRef = doc(fireStore, "searchHistory", id);
    await deleteDoc(docRef);
    set(state => ({
      searchHistory: state.searchHistory.filter(item => item.id !== id),
    }));
  },

  deleteAllSearchHistory: async (userId: string) => {
    const historyRef = collection(fireStore, "searchHistory");
    const q = query(historyRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach(doc => deleteDoc(doc.ref));
    set({ searchHistory: [] });
  },
}));
