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
  fetchNewsList: async () => {
    try {
      const listRef = collection(fireStore, "news");
      const q = query(listRef, where("stockName", "!=", "rank"), limit(4));
      const documentSnapshots = await getDocs(q);
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const list = documentSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Update state
      set({ newsList: list, lastVisible });
    } catch (error) {
      console.error("Failed to fetch news list:", error);
    }
  },

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

  fetchNewsArticle: async ({ id }: { id: string }) => {
    try {
      const newsRef = collection(fireStore, "news");
      const q = query(newsRef, where(documentId(), "==", id));
      const querySnapshot = await getDocs(q);
      // const data = getDoc(doc(fireStore, "news", aid));

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data(); // 첫 번째 문서의 데이터 가져오기
        const data = { id: querySnapshot.docs[0].id, ...docData }; // id와 데이터를 객체로 합치기

        set({ newsArticle: data });

        // Firestore에 저장
        // const newsArticleRef = collection(db, "newsArticles");
        // await addDoc(newsArticleRef, { type, aid, data });
      } else {
        console.error("No document found");
      }
    } catch (error) {
      console.error("Failed to fetch news article:", error);
    }
  },
}));
