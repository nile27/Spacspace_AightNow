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
      <div className="w-[1200px] h-16  flex justify-between items-center    shadow-sm">
        <div className="w-[388px] h-16 flex items-center gap-3">
          <Icon name="apple" size={40} />
          <span className="text-lg font-medium">애플 · APPL</span>
        </div>
        <TextButton size="sm">관심종목 추가</TextButton>
      </div>
      <div className="w-[1200px] flex justify-between">
        <Summary />
        <Chart />
      </div>
      <div className="flex justify-between ">
        <AIReport />
        <Analysis />
      </div>
      <FavoriteNews />
    </>
  );
}
