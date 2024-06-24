import Icon from "@/components/Stock/Icon";
import Toggle from "@/components/Toggle/Toggle";
import TextButton from "@/components/btnUi/TextButton";
import Summary from "./Summary";
import Chart from "./Chart";
import AIReport from "./AIReport";
import Analysis from "./Analysis";
import FavoriteNews from "./FavoriteNews";

export default function Report() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="w-[1200px] h-16  flex justify-between items-center  ">
          <div className="w-[388px] h-16 flex items-center gap-2">
            <Icon name="google" size={50} />
            <span className="text-lg font-medium">애플 · APPL</span>
          </div>
          <TextButton size="custom" width={"167"} height={"56"}>
            관심종목 추가
          </TextButton>
        </div>
        <div className="w-[1200px] flex gap-4">
          <Summary />
          <Chart />
        </div>
        <div className="w-[1200px] flex gap-4 ">
          <AIReport />
          <Analysis />
        </div>
        <FavoriteNews />
      </div>
    </>
  );
}
