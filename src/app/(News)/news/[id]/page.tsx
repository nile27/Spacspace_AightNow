import { TNewsList } from "@/app/api/(crawler)/type";
import Article from "@/features/news/components/Article";
import { getNewsArticle, getStockNewsList, updateViews } from "@/lib/newsAction";
import { stockAction2 } from "@/lib/stockAction";
import { summaryAI } from "@/lib/summaryAI";

type TPageProps = {
  params: { id: string };
};

export default async function NewsDetail({ params }: TPageProps) {
  const { id } = params;

  const [articleData, viewCount] = await Promise.all([getNewsArticle(id), updateViews(id)]);
  // const article = articleData as TNewsList;
  // const summary = await summaryAI({ newsContent: article.content });

  // const stockNewsData = article.relatedItems ? await getStockNewsList(article.relatedItems) : [];
  // const stockDataList = new Map();

  // if (article.relatedItems) {
  //   await Promise.all(
  //     article.relatedItems.map(async item => {
  //       const stockData = await stockAction2(item);
  //       stockDataList.set(item, stockData);
  //     }),
  //   );
  // }

  return (
    <Article
      id={id}
      articleData={articleData}
      view={viewCount}
      // summary={summary.toString() || JSON.stringify(summary)}
      // stockNews={stockNewsData as (TNewsList & { id: string })[]}
      // stockDataList={stockDataList}
    />
  );
}
