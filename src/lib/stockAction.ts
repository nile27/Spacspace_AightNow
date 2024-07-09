import { revalidatePath } from "next/cache";

export const STOCK_NAME: { [key: string]: string } = {
  tesla: "TSLA.O",
  google: "GOOGL.O",
  apple: "AAPL.O",
  microsoft: "MSFT.O",
  amazon: "AMZN.O",
  unity: "U",
};

//기업 개요
export const stockAction = async (stock: string) => {
  const res = await fetch(`https://api.stock.naver.com/stock/${STOCK_NAME[stock]}/integration`);
  const data = await res.json();
  // revalidatePath("/report");
  const { corporateOverview } = data;
  return corporateOverview;
};
// 기업 주식 정보
export const stockAction2 = async (stock: string) => {
  const res = await fetch(`https://api.stock.naver.com/stock/${STOCK_NAME[stock]}/basic`);
  const data = await res.json();
  // revalidatePath("/report");
  const {
    stockName,
    compareToPreviousPrice,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    reutersCode,
  } = data;
  return {
    stockName,
    compareToPreviousPrice,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    reutersCode,
  };
};

// 기업 주식 정보
export const stockAction4 = async () => {
  const res = await fetch("https://api.stock.naver.com/stock/AAPL.O/basic");
  const data = await res.json();
  // revalidatePath("/report");
  const {
    stockItemTotalInfos,
    stockName,
    compareToPreviousPrice,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    reutersCode,
  } = data;

  const [
    { value: basePrice },
    { value: openPrice },
    { value: highPrice },
    { value: lowPrice },
    { value: tradingVolume },
    { value: tradingValue },
    { value: marketValue },
    { value: industryGroup },
    { value: highPrice52Weeks },
    { value: lowPrice52Weeks },
    { value: per },
    { value: eps },
    { value: pbr },
    { value: bps },
    { value: dividend },
    { value: dividendYieldRatio },
    { value: dividendAt },
    { value: exDividendAt },
    { value: faceValueDivisionRate },
    { value: faceValue },
  ] = stockItemTotalInfos;

  return [
    { value: basePrice },
    { value: openPrice },
    { value: highPrice },
    { value: lowPrice },
    { value: tradingVolume },
    { value: tradingValue },
    { value: marketValue },
    { value: industryGroup },
    { value: highPrice52Weeks },
    { value: lowPrice52Weeks },
    { value: per },
    { value: eps },
    { value: pbr },
    { value: bps },
    { value: dividend },
    { value: dividendYieldRatio },
    { value: dividendAt },
    { value: exDividendAt },
    { value: faceValueDivisionRate },
    { value: faceValue },
    {
      stockName,
      compareToPreviousPrice,
      closePrice,
      compareToPreviousClosePrice,
      fluctuationsRatio,
      reutersCode,
    },
  ];
};
// 원화 정보
export const exchangeRate = async () => {
  const res = await fetch(
    "https://m.stock.naver.com/front-api/marketIndex/productDetail?category=exchange&reutersCode=FX_USDKRW",
  );
  const data = await res.json();

  const {
    result: { closePrice },
  } = data;
  return closePrice;
};
