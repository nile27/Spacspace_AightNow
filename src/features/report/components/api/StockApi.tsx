export default async function StockApi() {
  const res = await fetch("https://api.stock.naver.com/stock/AAPL.O/basic");
  const data = await res.json();

  const TStockApiData = {
    compareToPreviousClosePrice: 0,
    fluctuationsRatio: 0,
    stockExchangeType: {
      code: "",
    },
    compareToPreviousPrice: {
      text: "",
    },
  };

  const {
    compareToPreviousClosePrice,
    fluctuationsRatio,
    stockExchangeType,
    compareToPreviousPrice,
  } = data;

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <div className="text-rose-500">증감가격:{compareToPreviousClosePrice}</div>
      <div className="text-rose-500">증감비율:{fluctuationsRatio}</div>
      <div className="text-rose-500">주식시장 코드:{stockExchangeType.code}</div>
      <div className="text-rose-500">상승인지 하락인지 :{compareToPreviousPrice.text}</div>
    </>
  );
}
