export type TIconProps = {
  name: string;
  size?: number | string;
  fill?: string;
};

const stockNameMap: { [key: string]: string } = {
  tesla: "StockTSLA.O",
  google: "StockGOOGL.O",
  apple: "StockAAPL.O",
  microsoft: "StockMSFT.O",
  amazon: "StockAMZN.O",
  unity: "StockU",

  테슬라: "StockTSLA.O",
  구글: "StockGOOGL.O",
  애플: "StockAAPL.O",
  마이크로소프트: "StockMSFT.O",
  아마존: "StockAMZN.O",
  유니티: "StockU",
};

function Icon(props: React.SVGProps<SVGSVGElement> & TIconProps) {
  const { name, size = "100%", ...rest } = props;
  const iconName = stockNameMap[name] || name;

  return (
    <svg width={size} height={size} {...rest} xmlns="http://www.w3.org/2000/svg">
      <use href={`/icons/spriteSheet.svg#${iconName}`} />
    </svg>
  );
}

export default Icon;
