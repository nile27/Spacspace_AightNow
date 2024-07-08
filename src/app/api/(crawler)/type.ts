type TStockData = {
  reutersCode: string;
  stockName: string;
  symbolCode: string;
  closePrice: number;
  compareToPreviousPriceText: string;
  compareToPreviousClosePrice: number;
  fluctuationsRatio: number;
};

type TNewsList = {
  stockName?: string;
  subcontent: string;
  thumbUrl: string;
  tit: string; // title
  ohnm: string; // 언론사
  aid: string; // article id
  dt: string; // date / time
  oid?: string;
  type?: number; // 0: 사진없음, 1: 사진있음
  isVideo?: boolean;
  hasImage?: boolean;
};

type TArticle = {
  articleId: string;
  title: string;
  provider: string | null;
  time: string;
  body: string;
  image: string | null;
};

export type { TStockData, TArticle, TNewsList };
