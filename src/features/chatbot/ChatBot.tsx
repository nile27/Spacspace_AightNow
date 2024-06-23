import TextButton from "@/components/btnUi/TextButton";
import Bot from "./Bot";
import User from "./User";
import IconButton from "@/components/btnUi/IconButton";

export default function ChatBot() {
  return (
    <>
      <div
        className="w-[512px] h-[656px] fixed bottom-4 right-4 py-2 px-4"
        style={{ width: "512px", height: "656px" }}
      >
        <div className="shadow relative flex flex-col h-full">
          <div className="w-full h-20  bg-mainNavy-900 rounded-t-3xl flex items-center justify-between px-4">
            <div className="text-scaleGray-0 text-2xl font-bold leading-loose">나우챗봇</div>
            <div className="w-8 h-8 relative">
              <IconButton icon="Close" size="auto" />
            </div>
          </div>

          <div className="flex-grow p-4 overflow-auto">
            <Bot
              content={`안녕하세요 아잇나우 챗봇입니다. 해외주식 관련해서 궁금하신 점이 있으면 저에게
            물어보세요!`}
            />
            <User content={`애플의 주요 매출처는 어떤 곳들인가요?`} />
            <Bot
              content={`애플의 주요 매출처에 대한 구체적인 정보를 찾지 못했습니다. 양해 부탁드리며, 다른
                  주제로 도와드릴 내용이 있으면 알려주세요.`}
            />
            <User content={`테슬라의 주가를 분석해줘`} />
            <Bot
              content={`테슬라의 주가를 분석한 리포트가 있습니다. 다만 투자 결정을 내리기 전에 전문가나
                  금융 자문가와 상담을 하는 것이 좋습니다. 실시간 AI리포트 페이지로 이동을 도와드릴까요?`}
            />
          </div>
          <form className="bg-white border-t  border-gray-200 flex items-center gap-2.5 p-4">
            <div className="flex-grow">
              <div className="bg-white rounded-lg border border-stone-300 flex justify-between items-center p-4">
                <input
                  type="text"
                  className="text-neutral-900 text-base font-normal focus:outline-none w-full"
                />
              </div>
            </div>
            <div className="h-14 px-2.5 py-4 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
              <div className="text-white text-base font-medium leading-normal">전송</div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
