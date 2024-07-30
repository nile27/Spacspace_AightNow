"use server";

import { TStockData } from "@/app/api/(crawler)/type";
import fireStore from "@/firebase/firestore";
import {
  addDoc,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

// 주식별 정보 가져오기
// AAPL.O 로 받음
export const getStockInfo = async (stock: string) => {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/news/stock/${stock}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${stock}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching stock info:", error);
    return null;
  }
};

export const allStockAction = async (): Promise<TStockData[]> => {
  const allStocks: TStockData[] = [];
  const symbols = ["AAPL.O", "TSLA.O", "MSFT.O", "AMZN.O", "GOOGL.O", "U"];
  const stockNames = ["애플", "테슬라", "마이크로소프트", "아마존", "구글", "유니티"];
  const logos = ["apple", "tesla", "microsoft", "amazon", "google", "unity"];

  const stockPromises = symbols.map(async (symbol, index) => {
    try {
      const res = await fetch(`https://api.stock.naver.com/stock/${symbol}/basic`);
      const data = await res.json();

      const {
        compareToPreviousPrice,
        closePrice,
        compareToPreviousClosePrice,
        fluctuationsRatio,
        reutersCode,
      } = data;

      const stockData: TStockData = {
        reutersCode,
        stockName: stockNames[index],
        symbolCode: symbol,
        closePrice,
        compareToPreviousPrice,
        compareToPreviousClosePrice,
        fluctuationsRatio,
        logo: logos[index],
      };

      return stockData;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  const stockDataArray = await Promise.all(stockPromises);

  stockDataArray.forEach(stockData => {
    if (stockData) {
      allStocks.push(stockData);
    }
  });

  return allStocks;
};

// 사용자별 조회 기록
export const getSearchHistory = async (userId: string) => {
  try {
    const historyRef = collection(fireStore, "searchHistory");
    const q = query(historyRef, where("userId", "==", userId), orderBy("time", "desc"), limit(10));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ ...doc.data() }));

    return data;
  } catch (error) {
    console.error("Error fetching userStock:", error);
  }
};

// 주식 조회
export const getSearchStockHistory = async (userId: string) => {
  try {
    const historyRef = collection(fireStore, "searchHistory");
    const q = query(
      historyRef,
      where("userId", "==", userId),
      where("isNews", "==", false),
      orderBy("time", "desc"),
      limit(4),
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ ...doc.data() }));

    return data;
  } catch (error) {
    console.error("Error fetching search stock history:", error);
  }
};

// 관심 종목 뉴스 리스트
export const getStockNewsList = async (stockNames: string[]) => {
  try {
    const rankRef = collection(fireStore, "news");
    const q = query(
      rankRef,
      where("stockName", "in", stockNames),
      orderBy("dt", "desc"),
      orderBy("stockName"),
    );
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    console.error("Failed to fetch stock news:", error);
  }
};

// 인기 뉴스 리스트
export const getRankNewsList = async () => {
  try {
    const listRef = collection(fireStore, "news");
    const q = query(listRef, where("stockName", "==", "rank"), limit(4));
    const querySnapshot = await getDocs(q);

    const newsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return newsList;
  } catch (error) {
    console.error("Failed to fetch rank news list:", error);
  }
};

// 뉴스 기사
export const getNewsArticle = async (id: string) => {
  try {
    const newsRef = collection(fireStore, "news");
    const q = query(newsRef, where(documentId(), "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      const data = { id: querySnapshot.docs[0].id, ...docData };

      return data;
    } else {
      console.error("No such document");
    }
  } catch (error) {
    console.error("Error fetching news article:", error);
  }
};

// 조회수 업데이트
export const updateViews = async (id: string) => {
  try {
    const newsRef = doc(fireStore, "news", id);
    await updateDoc(newsRef, {
      views: increment(1),
    });

    const docSnapshot = await getDoc(newsRef);
    if (docSnapshot.exists()) {
      const updatedViews = docSnapshot.data().views;
      return updatedViews;
    }
  } catch (error) {
    console.error("Error updating views:", error);
  }
};

// 번역
export const fetchTranslate = async (html: string, targetLang: string, newsArticleId: string) => {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/translate`, {
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
};
