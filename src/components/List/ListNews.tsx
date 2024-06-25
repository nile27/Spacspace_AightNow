export default function ListNews() {
  return (
    <>
      <div className="w-[1104px] h-[212px] justify-start items-start gap-5 inline-flex">
        <img
          className="w-[252px] h-[148px] rounded-2xl"
          src="https://via.placeholder.com/172x100"
        />
        <div className="flex-col justify-start items-start gap-4 inline-flex">
          <div className="w-[832px] h-7 self-stretch justify-start items-center gap-4 inline-flex">
            <div className="w-[82px] h-14 flex justify-between items-center grow shrink basis-0 text-neutral-900 text-lg font-bold font-['Pretendard'] leading-7">
              "산유국 되나" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨
              <div className="justify-start items-start gap-2 flex">
                <div className="text-zinc-600 text-sm font-medium font-['Pretendard'] leading-tight">
                  n시간전
                </div>
                <div className="text-zinc-600 text-sm font-medium font-['Pretendard'] leading-tight">
                  ∙
                </div>
                <div className="text-zinc-600 text-sm font-medium font-['Pretendard'] leading-tight">
                  문화일보
                </div>
              </div>
            </div>
          </div>
          <div className="w-[832px] h-14  text-neutral-900 text-base font-normal font-['Pretendard'] ">
            <p
              style={{
                width: "832px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "4",
                WebkitBoxOrient: "vertical",
              }}
            >
              윤석열 대통령이 "포항 앞바다에 막대한 양의 석유·천연가스 매장 가능성이 있다"고
              발표하면서 석유주가 이틀째 급등했다.3일 한국석유(004090)는 전일대비 5350원(29.81%)
              오른 2만3300원에 거래를 마쳤다. 한국석유는 전날에도 상한가로 장을 마친 바 있다.이
              외에도 한국ANKOR유전도 상한가를 찍었고, 흥구석유(024060)는 18.40% 올랐다. 윤석열
              대통령은 전날 용산 대통령실에서 열린 국정 브리핑에서 "포항 영일만 앞바다에 막대한 양의
              석유와 가스가 매장돼 있을 가능성이 높다는 물리탐사 결과가 나왔다"고 밝혔다.매장량은
              최대 140억 배럴 가능성이 예상되며 천연가스는 29년, 석유는 4년 이상 사용할 양이라고
              설명했다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
