import { TNewsList } from "@/app/api/(crawler)/type";
import Article from "@/features/news/components/Article";
import { getNewsArticle, getStockNewsList, updateViews } from "@/lib/newsAction";
import { stockAction2 } from "@/lib/stockAction";

type TPageProps = {
  params: { id: string };
};

export default async function NewsDetail({ params }: TPageProps) {
  const { id } = params;

  // getNewsArticle와 updateViews 결과 확인
  const [articleData, viewCount] = await Promise.all([getNewsArticle(id), updateViews(id)]);

  // articleData 검증
  if (!articleData || typeof articleData !== "object") {
    console.error("Error: articleData is undefined or invalid:", articleData);
    return <div>기사 데이터를 불러오는데 실패했습니다.</div>;
  }

  const article = articleData as TNewsList;
  console.log("Fetched article data:", article); // Debugging 로그

  // stockNewsData 가져오기
  const stockNewsData = article.relatedItems ? await getStockNewsList(article.relatedItems) : [];

  console.log("Stock news data:", stockNewsData); // Debugging 로그

  // stockDataList 생성
  const stockDataList = new Map();
  if (article.relatedItems && Array.isArray(article.relatedItems)) {
    await Promise.all(
      article.relatedItems.map(async item => {
        try {
          const stockData = await stockAction2(item);
          stockDataList.set(item, stockData);
        } catch (error) {
          console.error(`Error fetching stock data for item ${item}:`, error);
        }
      }),
    );
  } else {
    console.warn("No relatedItems found in article.");
  }

  console.log("Stock data list:", stockDataList); // Debugging 로그

  return (
    <Article
      id={id}
      articleData={articleData}
      view={viewCount}
      stockNews={stockNewsData as (TNewsList & { id: string })[]}
      stockDataList={stockDataList}
    />
  );
}
