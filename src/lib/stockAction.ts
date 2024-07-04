"use server";

import { revalidatePath } from "next/cache";

export const stockAction = async () => {
  const res = await fetch("https://api.stock.naver.com/stock/AAPL.O/integration");
  const data = await res.json();
  // revalidatePath("/report");
  const { corporateOverview } = data;
  return corporateOverview;
};

export const stockAction2 = async () => {
  const res = await fetch("https://api.stock.naver.com/stock/AAPL.O/basic");
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
