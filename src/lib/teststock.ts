export const stockAction5 = async (id: string) => {
  const data = await (await fetch(`https://api.stock.naver.com/stock/AAPL.O/basic`)).json();

  console.log(data);
};
