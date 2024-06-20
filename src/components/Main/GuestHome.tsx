import TextButton from "@/components/btnUi/TextButton";
import GuestHeader from "./GuestHeder";

export default function GuestHome() {
  return (
    <>
      <div className="relative h-screen w-screen">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="relative z-10 flex flex-col justify-between h-full">
          <GuestHeader />
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32 text-center">
            <h1 className="text-white sm:text-6xl">
              해외주식은 <span className="font-bold">아잇나우</span>와 함께!
            </h1>
            <p className="my-6 text-2xl leading-8 text-white">
              해외 주식 뉴스 실시간 번역과 <br />
              AI 애널리스트가 알려주는 어려운 해외주식 리포트
            </p>
            <div>
              <TextButton>로그인</TextButton>
            </div>
          </div>
          <div
            className="w-full h-[200px] lg:mt-[-40px] lg:h-[380px] relative"
            style={{
              backgroundImage: "url('/hero-bg2.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center top",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
