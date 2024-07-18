import { TNewsList } from "@/app/api/(crawler)/type";

// 배열을 랜덤하게 섞는 함수
const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const getRandomStocks = (stockList: string[], count: number) => {
  const shuffled = shuffleArray(stockList);
  return shuffled.slice(0, count);
};

// 이미지가 있는 랜덤 주식 종목 뉴스를 가져오는 함수
const getRandomImageNews = (newsList: TNewsList[], count: number) => {
  const shuffled = shuffleArray(newsList.filter(stock => stock.image));
  return shuffled.slice(0, count);
};

// 중복되지 않는 랜덤 주식 종목을 가져오는 함수
const getUniqueRandomStocks = (stockList: string[], count1: number, count2: number) => {
  const shuffled = shuffleArray(stockList);
  const list1 = shuffled.slice(0, count1);
  const list2 = shuffled.slice(count1, count1 + count2);
  return [list1, list2];
};

export { shuffleArray, getRandomStocks, getRandomImageNews, getUniqueRandomStocks };
