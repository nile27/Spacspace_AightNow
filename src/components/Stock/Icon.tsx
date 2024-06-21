type TIconProps = {
  name: string;
  size?: number | string;
};

const stockNameMap: { [key: string]: string } = {
  tesla: "StockTSLA.O",
  google: "StockGOOGL.O",
  apple: "StockAAPL.O",
  microsoft: "StockMSFT.O",
  amazon: "StockAMZN.O",
  unity: "StockU",
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
