import fireStore from "@/firebase/firestore";
import { collection, doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { TNewsList } from "../../type";

async function addNewsToFirestore(stockName: string, newsList: TNewsList[]) {
  const newsRef = collection(fireStore, "news");

  try {
    for (const news of newsList) {
      const { aid, ...newsData } = news;
      await setDoc(doc(newsRef, aid), {
        // aid,
        ...newsData,
        stockName: stockName,
        views: 0, // 조회수 필드
        translated: false, // 번역 여부 필드
        translations: { "en-US": "", ZH: "", JA: "", FR: "" }, // 번역된 내용
      });
    }
    console.log(`News added to Firestore for ${stockName}`);
  } catch (error) {
    console.error(`Error adding news to Firestore for ${stockName}:`, error);
  }
}

async function increaseNewsViews(articleId: string) {
  const newsRef = doc(fireStore, "news", articleId);

  try {
    await updateDoc(newsRef, {
      views: increment(1), // 조회수 1 증가
    });
    console.log(`Views incremented for news article ${articleId}`);
  } catch (error) {
    console.error(`Error incrementing views for news article ${articleId}:`, error);
  }
}

async function handleTranslate(content: string, targetLang: string) {
  try {
    const response = await fetch("http://localhost:3000/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ html: content, targetLang }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    const result = await response.json();
    return result.translatedHTML;
  } catch (error) {
    console.error("Error translating HTML:", error);
    throw error; // 에러를 다시 throw하여 상위 컴포넌트에서 처리
  }
}

export { addNewsToFirestore, increaseNewsViews, handleTranslate };
