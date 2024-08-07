"use server";

const STOCK_NAME: { [key: string]: string } = {
  tesla: "TSLA.O",
  google: "GOOGL.O",
  apple: "AAPL.O",
  microsoft: "MSFT.O",
  amazon: "AMZN.O",
  unity: "U",
};

//기업 개요 정보
export const stockAction = async (stock: string) => {
  const res = await fetch(`https://api.stock.naver.com/stock/${STOCK_NAME[stock]}/integration`);
  const data = await res.json();

  const { corporateOverview } = data;
  return corporateOverview;
};
// 기업 주식 가격 정보
export const stockAction2 = async (stock: string) => {
  const res = await fetch(`https://api.stock.naver.com/stock/${STOCK_NAME[stock]}/basic`);
  const data = await res.json();

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

// 기업 주식 정보 (llm 적용 , 52주저고가, eps, per, pbr, 배당수익률 등..)
export const stockAction4 = async (stock: string) => {
  const res = await fetch(`https://api.stock.naver.com/stock/${STOCK_NAME[stock]}/basic`);
  const data = await res.json();
  // revalidatePath(`/report/${STOCK_NAME[stock]}`);

  return data.stockItemTotalInfos;
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
