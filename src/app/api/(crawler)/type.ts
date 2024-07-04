type TStockData = {
  reutersCode: string;
  stockName: string;
  symbolCode: string;
  closePrice: number;
  compareToPreviousPriceText: string;
  compareToPreviousClosePrice: number;
  fluctuationsRatio: number;
};

type TArticle = {
  title: string;
  provider: string;
  time: string;
  published: string;
  url: string;
  content: string;
  image: string;
  stockName: string;
  articleId: number;
};

type TNewsList = {
  stockName?: string;
  type: number;
  subcontent: string;
  tumbUrl: string;
  oid: string;
  ohnm: number;
  aid: string;
  tit: string;
  dt: number;
};

export type { TStockData, TArticle, TNewsList };
