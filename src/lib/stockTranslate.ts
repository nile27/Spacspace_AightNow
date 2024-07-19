const STOCK_NAME_KO_TO_EN: { [key: string]: string } = {
  애플: "apple",
  테슬라: "tesla",
  아마존: "amazon",
  구글: "google",
  마이크로소프트: "microsoft",
  유니티: "unity",
};

// 주식 영어이름 변환
export function stockTranslate(stock: string) {
  return STOCK_NAME_KO_TO_EN[stock];
}
