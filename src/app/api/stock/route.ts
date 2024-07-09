import { STOCK_NAME } from "@/lib/stockAction";

// 실시간 주식 가격 정보
export const stockRealTime = async (stock: string) => {
  const dateTime = new Date();
  const formattedDateTime =
    dateTime.getFullYear() +
    String(dateTime.getMonth() + 1).padStart(2, "0") +
    String(dateTime.getDate()).padStart(2, "0") +
    String(dateTime.getHours()).padStart(2, "0") +
    String(dateTime.getMinutes()).padStart(2, "0");

  const res = await fetch(
    `https://api.stock.naver.com/chart/foreign/item/${STOCK_NAME[stock]}/day?startDateTime=202212120000&endDateTime=${formattedDateTime}`,
  );
  const data = await res.json();

  return data;
};
