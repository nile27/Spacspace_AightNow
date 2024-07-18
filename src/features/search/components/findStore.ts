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
  orderBy,
  limit,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { create } from "zustand";

type TFindStore = {
  searchHistory: any[];
  stockHistory: any[];
  searchRank: any[];
  addSearchHistory: (
    userId: string,
    term: string,
    time: string,
    isNews: boolean,
    slug: string,
  ) => void;
  getSearchHistory: (userId: string) => void;
  getSearchStockHistory: (userId?: string) => void;
  getSearchRank: () => void;
  deleteSearchHistory: (id: string) => void;
  deleteAllSearchHistory: (userId: string) => void;
  updateSearchHistory: (userId: string, term: string, time: string) => void;
};

export const useFindStore = create<TFindStore>(set => ({
  searchHistory: [],
  stockHistory: [],
  searchRank: [],

  addSearchHistory: async (
    userId: string,
    term: string,
    time: string,
    isNews: boolean,
    slug: string,
  ) => {
    try {
      // 검색 기록 추가
      const historyRef = collection(fireStore, "searchHistory");
      await addDoc(historyRef, { userId, term, time, isNews, slug });

      // 검색어 랭킹 업데이트
      const rankRef = doc(fireStore, "searchRank", term);
      const docSnap = await getDoc(rankRef);

      if (docSnap.exists()) {
        // 문서가 존재하면 view를 증가
        await updateDoc(rankRef, {
          view: docSnap.data().view + 1,
        });
      } else {
        // 문서가 존재하지 않으면 새 문서를 생성
        await setDoc(rankRef, {
          term,
          isNews,
          slug,
          view: 1,
        });
      }
    } catch (error) {
      console.error("Error updating search history or rank:", error);
    }
  },

  getSearchHistory: async (userId: string) => {
    const historyRef = collection(fireStore, "searchHistory");
    const q = query(historyRef, where("userId", "==", userId), orderBy("time", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    set({ searchHistory: data });
  },

  getSearchStockHistory: async (userId?: string) => {
    const historyRef = collection(fireStore, "searchHistory");
    const q = query(
      historyRef,
      where("userId", "==", userId),
      where("isNews", "==", false),
      orderBy("time", "desc"),
      limit(10),
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    set({ stockHistory: data });
  },

  getSearchRank: async () => {
    const rankRef = collection(fireStore, "searchRank");
    const q = query(rankRef, orderBy("view", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => doc.data());

    set({ searchRank: data });
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
  updateSearchHistory: async (userId: string, term: string, time: string) => {
    const historyRef = collection(fireStore, "searchHistory");
    const q = query(historyRef, where("userId", "==", userId), where("term", "==", term));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      const docRef = doc(fireStore, "searchHistory", docId);
      await updateDoc(docRef, { time });
    }
  },
}));
