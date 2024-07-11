import fireStore from "@/firebase/firestore";
import {
  collection,
  limit,
  getDocs,
  query,
  where,
  documentId,
  orderBy,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { create } from "zustand";

type TNewsStore = {
  newsList: any[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  aid: string;
  newsArticle: any;
  fetchNewsList: () => void;
  fetchMoreNews: () => Promise<void>;
  fetchStockList: (stockName: string) => void;
  fetchRankNewsList: () => void;
  fetchNewsArticle: (params: { id: string }) => void;
};

export const useNewsStore = create<TNewsStore>((set, get) => ({
  newsList: [],
  newsArticle: {} as any,
  lastVisible: null,
  aid: "",

  // 초기 데이터 로드 함수
  fetchNewsList: async () => {
    try {
      const listRef = collection(fireStore, "news");
      const q = query(listRef, where("stockName", "!=", "rank"), limit(4));
      const documentSnapshots = await getDocs(q);
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const list = documentSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      set({ newsList: list, lastVisible });
    } catch (error) {
      console.error("Failed to fetch news list:", error);
    }
  },

  // 추가 데이터 로드 함수
  fetchMoreNews: async () => {
    try {
      const { lastVisible, newsList } = get();

      if (lastVisible) {
        const next = query(
          collection(fireStore, "news"),
          where("stockName", "!=", "rank"),
          // orderBy("dt", "desc"),
          startAfter(lastVisible),
          limit(4),
        );

        const documentSnapshots = await getDocs(next);
        const newLastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        const newList = documentSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        set({ newsList: [...newsList, ...newList], lastVisible: newLastVisible });
      }
    } catch (error) {
      console.error("Failed to fetch more news:", error);
    }
  },

  // 특정 주식 관련 뉴스 리스트 가져오기
  fetchStockList: async (stockName: string) => {
    try {
      const rankRef = collection(fireStore, "news");
      const q = query(rankRef, where("stockName", "==", stockName));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      set({ newsList: data });
    } catch (error) {
      console.error("Failed to fetch rank news:", error);
    }
  },

  // 랭킹 뉴스 리스트 가져오기
  fetchRankNewsList: async () => {
    try {
      const rankRef = collection(fireStore, "news");
      const q = query(rankRef, where("stockName", "==", "rank"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      set({ newsList: data });
    } catch (error) {
      console.error("Failed to fetch rank news:", error);
    }
  },
  // 특정 뉴스 가져오기
  fetchNewsArticle: async ({ id }: { id: string }) => {
    try {
      const newsRef = collection(fireStore, "news");
      const q = query(newsRef, where(documentId(), "==", id));
      const querySnapshot = await getDocs(q);
      // const data = getDoc(doc(fireStore, "news", aid));

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        const data = { id: querySnapshot.docs[0].id, ...docData };

        set({ newsArticle: data });
      } else {
        console.error("No document found");
      }
    } catch (error) {
      console.error("Failed to fetch news article:", error);
    }
  },
}));
