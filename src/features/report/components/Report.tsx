import Icon from "@/components/Stock/Icon";
import TextButton from "@/components/btnUi/TextButton";
import Summary from "./Summary";
import Chart from "./Chart";
import AIReport from "./AIReport";
import Analysis from "./Analysis";
import FavoriteNews from "./FavoriteNews";
import { addDoc, collection, getDoc, deleteDoc } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import { exchangeRate, stockAction, stockAction2 } from "@/lib/stockAction";
import { stockAction3 } from "@/app/api/stock/route";
import Llmtest from "@/app/api/route";
import { llmChat } from "@/lib/testOllama";
import { llmChat2 } from "@/lib/testOllama2";
import { agentChat } from "@/lib/testOllama3";

export default async function Report() {
  const appleStock = await stockAction();
  const appleStock2 = await stockAction2();
  const { stockName, reutersCode } = appleStock2;
  const stockCode = reutersCode.split(".")[0];
  const stockHistory = await stockAction3();
  // const llm = await Llmtest();
  const exchange = await exchangeRate();
  // const chat = await llmChat2();
  const chat = await agentChat();

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="w-[1200px] h-16  flex justify-between items-center  ">
          <div className="w-[388px] h-16 flex items-center gap-2">
            <Icon name={stockName} size={50} />
            <span className="text-lg font-medium">
              {stockName} · {stockCode}
            </span>
          </div>
          <TextButton size="custom" width={"167px"} height={"56px"}>
            관심종목 추가
          </TextButton>
        </div>
        <div className="w-[1200px] flex gap-4">
          <Summary overview={appleStock} stockInfo={appleStock2} exchange={exchange} />
          <Chart stockData={stockHistory} />
        </div>
        <div className="w-[1200px] flex gap-4 ">
          <AIReport />
          <Analysis stockName={stockName} stockInfo={appleStock2} report={chat ?? ""} />
        </div>
        <FavoriteNews />
      </div>
    </>
  );
}
