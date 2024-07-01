import CardSmallNews from "@/components/Card/CardSmallNews";
import Header from "@/components/Header";
import BasicIcon from "@/components/Icon/BasicIcons";
import ListStockUp from "@/components/List/ListStockUp";
import TextButton from "@/components/btnUi/TextButton";
import Image from "next/image";

export default function NewsDetail() {
  return (
    <>
      <Header />
      <div className="w-[1200px] h-full flex justify-between  mt-52">
        <div className="w-[792px] h-[1200px] flex flex-col bg-white p-8 font-pretendard rounded-2xl">
          <h1 className="text-3xl">삼성·TSMC 중국 접근 막을 수도" 美 새 반도체 제한 전망</h1>
          <div className="w-[728px] h-9 flex  items-start ">
            <div className="w-[728px] flex  mt-4 gap-2  text-zinc-600 text-sm font-medium  leading-tight">
              <div className="">한국경제</div>
              <div className="text-right">∙</div>
              <div className="">2024년 6월 5일 오전 11:23</div>
              <div className="text-right">∙</div>
              <div className="text-right">조회수 12,038회</div>
            </div>
            <div className="mt-3">
              <TextButton size="custom" width="176px" height="36px" icon="Translate">
                번역하기
              </TextButton>
            </div>
          </div>
          <div className="w-[138px] h-6 flex justify-between my-8">
            <BasicIcon name="AI" size={24} />
            <div>아이낫우 AI 요약</div>
          </div>

          <div className=" flex flex-col">
            <div>
              바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성 바이오 연구의 첨단,인공
              유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생
              가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공
              유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생
              가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공
              유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성
            </div>
            <Image src="/news.png" alt="image" width={728} height={370} className="my-8" />
            <div>
              트웰브랩스는 지난해 10월 한국 스타트업으로는 처음으로 엔비디아의 투자를 받아
              주목받았던 회사다. 당시 총 투자유치액은 1000만달러였다. 이번 투자엔 지난해 투자에
              참여했던 투자사들이 연이어 참여했다. 뉴엔터프라이즈어소시에이트(NEA)와 엔비디아의
              자회사인 엔벤쳐스가 리드 투자자로 나섰고, 인덱스벤쳐스, 래디컬벤쳐스, 원더코벤처스 등
              글로벌 투자사들이 참여했다. 국내에서는 한국투자파트너스가 참여했다. 이로써
              트웰브랩스의 누적 투자 금액은 7700만 달러(약 1060억원) 수준이다. 엔벤쳐스 대표인
              모하메드 시딕 엔비디아 부사장은 “트웰브랩스의 뛰어난 영상이해 기술과 엔비디아의 가속
              컴퓨팅을 바탕으로 다양한 연구 협업을 할 예정”이라고 말했다. 한국투자파트너스의 김민준
              팀장은 “LLM 시장은 오픈AI를 비롯한 빅테크 중심으로 소위 ‘그들만의 리그’가 형성돼
              있지만, 멀티모달 영상이해AI 시장에서만큼은 트웰브랩스가 글로벌 선도 기업이 될 수
              있다고 판단했다"고 투자 배경을 설명했다. 트웰브랩스는 엔비디아와 협력해 기존
              언어모델에 특화된 텐서RT-LLM의 성능 개선 작업을 진행 중이다. 멀티모달 영상이해 분야를
              선점하는 게 목표다. 지난 3월 출시한 초거대 AI 영상 언어 생성 모델 ‘페가수스'와
              멀티모달 영상이해 모델 ‘마렝고’는 구글, 오픈AI 등 상용 및 오픈소스 영상 언어 모델과
              비교해 최대 43% 가량이 성능이 높다는 결과를 내기도 했다.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <div className="w-[384px] h-[310px] bg-white rounded-2xl font-pretendard p-8">
            <h2 className="text-xl  ">현재 뉴스와 관련된 주식</h2>
            <div className=" flex flex-col ">
              <ListStockUp />
              <ListStockUp />
              <ListStockUp />
            </div>
          </div>
          <div className="w-[388px] h-[488px] p-8 bg-white rounded-2xl font-pretendard">
            <h2 className="font-bold text-xl">관련기사</h2>
            <div className=" flex flex-col gap-y-5 mt-[10px]">
              <CardSmallNews />
              <CardSmallNews />
              <CardSmallNews />
              <CardSmallNews />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
