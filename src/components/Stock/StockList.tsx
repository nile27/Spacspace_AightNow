import Icon from "./Icon";

type TStockList = {
  name: string;
};

export default function StockList({ name }: TStockList) {
  return (
    <>
      <div className="w-[323px] h-8  flex gap-2 mt-5 item-center">
        <Icon name={name} size={32} />
        <div className=" flex justify-between items-center gap-1 font-medium ">
          <span>애플</span>
          <span>∙</span>
          <span>$00.00</span>
          <span className="text-rose-500">▲+1.75</span>
          <span className="text-rose-500">+0.82%</span>
        </div>
      </div>
    </>
  );
}
