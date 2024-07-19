"use server";

import { TStockData } from "@/app/api/(crawler)/type";
import fireStore from "@/firebase/firestore";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  increment,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

export const userStockAction = async () => {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}api/news/stock`);
    if (!response.ok) {
      throw new Error("Failed to fetch stock data");
    }

    const data: TStockData[] = await response.json();

    revalidatePath("/");
    return data;
  } catch (error) {
    console.error("Failed to fetch stock data:", error);
  }
};

export const userStockHistoryAction = async (user: any) => {
  try {
    const userDataId = (user?.userId as string) ? user?.userId : user?.id;
    const userRef = collection(fireStore, "users");
    const q = query(userRef, where("userId", "==", userDataId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDocs = querySnapshot.docs[0];
      const userData = userDocs.data();
      // revalidatePath("/");

      return userData.stock || [];
    } else {
      console.log("사용자를 찾을 수 없습니다");
      return [];
    }
  } catch (error) {
    console.error("Error fetching userStock:", error);
  }
};

// 관심 종목 뉴스 리스트
export const getStockNewsList = async (stockName: string[]) => {
  try {
    const listRef = collection(fireStore, "news");
    const q = query(listRef, where("stockName", "in", stockName), limit(4));
    const querySnapshot = await getDocs(q);

    const newsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // revalidatePath("/");
    return newsList;
  } catch (error) {
    console.error("Failed to fetch stock news list:", error);
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

    // revalidatePath("/news");
    return newsList;
  } catch (error) {
    console.error("Failed to fetch rank news list:", error);
  }
};

export const getNewsArticle = async (id: string) => {
  try {
    const newsRef = collection(fireStore, "news");
    const q = query(newsRef, where(documentId(), "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      const data = { id: querySnapshot.docs[0].id, ...docData };
      // revalidatePath("/news");
      return data;
    } else {
      console.error("No such document");
    }
  } catch (error) {
    console.error("Error fetching news article:", error);
  }
};

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

export const fetchTranslate = async (html: string, targetLang: string, newsArticleId: string) => {
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
};
