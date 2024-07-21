type TStockData = {
  reutersCode: string;
  stockName: string;
  symbolCode: string;
  closePrice: string;
  compareToPreviousPrice: {
    text: string;
  };
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
  logo: string;
};

type TNewsList = {
  id?: string;
  stockName: string;
  subcontent: string; // 리스트에 쓰일 내용
  content: string; // 뉴스 기사
  thumbUrl: string;
  tit: string; // title
  ohnm: string; // 언론사
  aid: string; // article id
  dt: string; // 뉴스 리스트 date / time
  published: string; // 뉴스 기사 시간
  oid?: string;
  type?: number; // 0: 사진없음, 1: 사진있음
  hasImage?: boolean;
  image: string | null;
  relatedItems: string[];
  translations: any;
};

// type TArticle = {
//   articleId: string;
//   title: string;
//   provider: string | null;
//   time: string;
//   body: string;
//   image: string | null;
// };

export type { TStockData, TNewsList };
