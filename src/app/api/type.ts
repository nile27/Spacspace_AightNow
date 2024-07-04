type StockData = {
  reutersCode: string;
  stockName: string;
  symbolCode: string;
  closePrice: number;
  compareToPreviousPriceText: string;
  compareToPreviousClosePrice: number;
  fluctuationsRatio: number;
};

type Article = {
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

export type { StockData, Article };
