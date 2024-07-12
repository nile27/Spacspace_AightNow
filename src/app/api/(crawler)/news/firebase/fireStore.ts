import fireStore from "@/firebase/firestore";
import { collection, doc, increment, setDoc, updateDoc } from "firebase/firestore";
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

export { addNewsToFirestore, increaseNewsViews };
