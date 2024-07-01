import StockList from "@/components/Stock/StockList";
import WatchInput from "./WatchInput";
import Header from "@/components/Header";
import BasicIcon from "@/components/Icon/BasicIcons";
import { useClose, useShow } from "@/Store/store";

export default function WatchListAdd() {
  const { isClose, setIsClose } = useClose();
  const { isShow } = useShow();

  const handleClose = () => {
    setIsClose(!isClose);
  };

  return (
    <>
      <Header />
      <div className="fixed inset-0 bg-scaleGray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="w-[794px] h-[735px] bg-white font-pretendard p-10 rounded-[32px] overflow-y-scroll scroll-smooth scrollbar-hide">
          <div className="w-full flex justify-center items-center">
            <div className="w-full flex justify-center font-bold text-2xl text-right text-mainNavy-900  ">
              관심종목 추가
            </div>
            <div>
              <button onClick={handleClose}>
                <BasicIcon name="Close" color="gray" width={48} height={48} />
              </button>
            </div>
          </div>
          <div>
            <WatchInput />
          </div>

          <div className="w-[714px] h-[332px] mt-12">
            <h2 className="text-lg text-mainNavy-900">인기검색어</h2>
            <div className="w-[714px] h-[288px] flex justify-center items-center gap-6   border border-scaleGray-400 rounded-2xl s ">
              <div>
                <StockList name={"apple"} size={32} />
                <StockList name={"google"} size={32} />
                <StockList name={"amazon"} size={32} />
                <StockList name={"unity"} size={32} />
                <StockList name={"tesla"} size={32} />
              </div>
              <div>
                <StockList name={"apple"} size={32} />
                <StockList name={"google"} size={32} />
                <StockList name={"amazon"} size={32} />
                <StockList name={"unity"} size={32} />
                <StockList name={"tesla"} size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
