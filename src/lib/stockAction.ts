"use server";

const STOCK_NAME: { [key: string]: string } = {
  tesla: "TSLA.O",
  google: "GOOGL.O",
  apple: "AAPL.O",
  microsoft: "MSFT.O",
  amazon: "AMZN.O",
  unity: "U",
};

function getStockSymbol(stock: string): string {
  const symbol = STOCK_NAME[stock.toLowerCase()];
  if (!symbol) {
    throw new Error(`Invalid stock symbol: ${stock}`);
  }
  return symbol;
}

//기업 개요 정보
export const stockAction = async (stock: string) => {
  try {
    const symbol = getStockSymbol(stock);
    const res = await fetch(`https://api.stock.naver.com/stock/${symbol}/integration`);
    if (!res.ok) {
      throw new Error(`Failed to fetch stock data: ${res.statusText}`);
    }
    const data = await res.json();
    const { corporateOverview } = data;
    return corporateOverview;
  } catch (error) {
    console.error("Error in stockAction:", error);
    throw error;
  }
};

// 기업 주식 가격 정보
export const stockAction2 = async (stock: string) => {
  try {
    const symbol = getStockSymbol(stock);
    const res = await fetch(`https://api.stock.naver.com/stock/${symbol}/basic`);
    if (!res.ok) {
      throw new Error(`Failed to fetch stock data: ${res.statusText}`);
    }
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
  } catch (error) {
    console.error("Error in stockAction2:", error);
    throw error;
  }
};

// 기업 주식 정보 (llm 적용 , 52주저고가, eps, per, pbr, 배당수익률 등..)
export const stockAction4 = async (stock: string) => {
  try {
    const symbol = getStockSymbol(stock);
    const res = await fetch(`https://api.stock.naver.com/stock/${symbol}/basic`);
    if (!res.ok) {
      throw new Error(`Failed to fetch stock data: ${res.statusText}`);
    }
    const data = await res.json();
    return data.stockItemTotalInfos;
  } catch (error) {
    console.error("Error in stockAction4:", error);
    throw error;
  }
};

// 원화 정보
export const exchangeRate = async () => {
  try {
    const res = await fetch(
      "https://m.stock.naver.com/front-api/marketIndex/productDetail?category=exchange&reutersCode=FX_USDKRW",
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch exchange rate data: ${res.statusText}`);
    }
    const data = await res.json();

    const {
      result: { closePrice },
    } = data;
    return closePrice;
  } catch (error) {
    console.error("Error in exchangeRate:", error);
    throw error;
  }
};
