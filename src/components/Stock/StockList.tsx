import Icon from "./Icon";
import { STOCK_NAMES } from "./Stock";

type TStockList = {
  name: string;
  size?: number;
};

export default function StockList({ name, size }: TStockList) {
  return (
    <>
      <div className="w-[323px] h-8  flex gap-2 mt-5 item-center">
        <Icon name={name} size={32} />
        <div className="w-[290px] flex justify-between items-center  font-medium ">
          <span>{STOCK_NAMES[name]}</span>
          <div>
            <span className="text-rose-500">▲+1.75</span>
            <span className="text-rose-500">+0.82%</span>
          </div>
        </div>
      </div>
    </>
  );
}
