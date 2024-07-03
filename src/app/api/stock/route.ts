"use server";

export const stockAction3 = async () => {
  const res = await fetch(
    "https://api.stock.naver.com/chart/foreign/item/AAPL.O/day?startDateTime=202205270000&endDateTime=202407031554",
  );
  const data = await res.json();

  return data;
};
