import LanguageButton from "@/components/btnUi/LanguageButton";

export default function MainLanguage() {
  return (
    <main className="w-full h-auto rounded-2xl p-[32px] min-h-[500px] bg-white ">
      <div className="w-full h-auto flex justify-between items-center mb-[24px]">
        <div className="w-auto h-auto">
          <h2 className=" text-body2  text-mainNavy-900 font-bold mb-3">언어 설정</h2>
          <span className="text-body4 font-light">
            이 설정에서 번역할 언어 선택하시면 뉴스에서 번역된 기사를 확인하실 수 있습니다.
          </span>
        </div>
      </div>
      <div className="w-full h-auto flex gap-[20px] flex-wrap">
        <LanguageButton style={"kr"} />
        <LanguageButton style={"en"} />
        <LanguageButton style={"ch"} />
        <LanguageButton style={"jp"} />
        <LanguageButton style={"fr"} />
      </div>
    </main>
  );
}
