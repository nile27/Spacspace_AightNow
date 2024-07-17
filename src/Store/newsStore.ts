import { TStockData } from "@/app/api/(crawler)/type";
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
  updateDoc,
  increment,
  doc,
  getDoc,
} from "firebase/firestore";
import { StringFormat } from "firebase/storage";
import { create } from "zustand";

type TStockStore = {
  stockData: TStockData[];
  fetchStockData: () => Promise<void>;
  // fetchStockData: (filterCondition?: (stock: TStockData) => boolean) => void;
};

export const useStockStore = create<TStockStore>(set => ({
  stockData: [],
  fetchStockData: async () => {
    try {
      const response = await fetch(`/api/news/stock`);
      const data: TStockData[] = await response.json();

      set({ stockData: data });
    } catch (error) {
      console.error("Failed to fetch stock data:", error);
    }
  },
}));

type TNewsStore = {
  newsList: any[];
  rankList: any[];
  stockNewsList: any[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
  aid: string;
  newsArticle: any;
  view: number;
  fetchNewsList: () => void;
  fetchMoreNews: () => Promise<void>;
  fetchStockNewsList: (stockName: string[]) => void;
  fetchRankNewsList: () => void;
  fetchNewsArticle: (params: { id: string }) => void;
  fetchUpdateViews: (id: string) => void;
  fetchTranslate: (html: string, targetLang: string, articleId: string) => void;
};

export const useNewsStore = create<TNewsStore>((set, get) => ({
  newsList: [],
  rankList: [],
  stockNewsList: [],
  newsArticle: {} as any,
  lastVisible: null,
  hasMore: true,
  aid: "",
  view: 0,

  // 초기 데이터 로드 함수
  fetchNewsList: async () => {
    try {
      const listRef = collection(fireStore, "news");
      const first = query(
        listRef,
        where("stockName", "!=", "rank"),
        orderBy("dt", "desc"),
        orderBy("stockName"),
        limit(4),
      );
      const querySnapshot = await getDocs(first);

      const newsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      const hasMore = querySnapshot.docs.length === 4;

      set({ newsList, lastVisible, hasMore });
    } catch (error) {
      console.error("Failed to fetch news list:", error);
    }
  },

  // 추가 데이터 로드 함수
  fetchMoreNews: async () => {
    try {
      const { lastVisible, newsList, hasMore } = get();

      if (lastVisible && hasMore) {
        const next = query(
          collection(fireStore, "news"),
          where("stockName", "!=", "rank"),
          orderBy("dt", "desc"),
          orderBy("stockName"),
          startAfter(lastVisible),
          limit(4),
        );

        const querySnapshot = await getDocs(next);
        const newNewsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        const moreDataAvailable = querySnapshot.docs.length === 4;

        set({
          newsList: [...newsList, ...newNewsList],
          lastVisible: newLastVisible,
          hasMore: moreDataAvailable,
        });
      }
    } catch (error) {
      console.error("Failed to fetch more news:", error);
    }
  },

  // 관심 종목 뉴스 리스트 가져오기
  fetchStockNewsList: async (stockNames: string[]) => {
    try {
      const rankRef = collection(fireStore, "news");
      const q = query(
        rankRef,
        where("stockName", "in", stockNames),
        orderBy("dt", "desc"),
        orderBy("stockName"),
        limit(4),
      );
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      set({ stockNewsList: data });
    } catch (error) {
      console.error("Failed to fetch rank news:", error);
    }
  },

  // 랭킹 뉴스 리스트 가져오기
  fetchRankNewsList: async () => {
    try {
      const rankRef = collection(fireStore, "news");
      const q = query(
        rankRef,
        where("stockName", "==", "rank"),
        orderBy("dt", "desc"),
        orderBy("stockName"),
        limit(3),
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      set({ rankList: data });
    } catch (error) {
      console.error("Failed to fetch rank news:", error);
    }
  },

  // 뉴스 기사 가져오기
  fetchNewsArticle: async ({ id }: { id: string }) => {
    try {
      const newsRef = collection(fireStore, "news");
      const q = query(newsRef, where(documentId(), "==", id));
      const querySnapshot = await getDocs(q);

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
  fetchUpdateViews: async (id: string) => {
    try {
      const newsRef = doc(fireStore, "news", id);
      await updateDoc(newsRef, {
        views: increment(1),
      });

      const docSnapshot = await getDoc(newsRef);
      if (docSnapshot.exists()) {
        const updatedViews = docSnapshot.data().views;
        set({ view: updatedViews });
      }
    } catch (error) {
      console.error("Failed to update views:", error);
    }
  },

  fetchTranslate: async (html: string, targetLang: string, newsArticleId: string) => {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ html, targetLang }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const result = await response.json();

      const articleRef = doc(fireStore, "news", newsArticleId);

      const docSnap = await getDoc(articleRef);
      if (docSnap.exists()) {
        const articleData = docSnap.data();
        // 현재 언어별 번역
        let translations = articleData.translations || {};

        // 언어별로 번역된 HTML 추가
        translations[targetLang] = result.translatedHTML;

        // 기사 문서 업데이트
        await updateDoc(articleRef, {
          translated: true,
          translations: translations,
        });
      }
    } catch (error) {
      console.error("Error translating HTML:", error);
      throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리
    }
  },
}));
