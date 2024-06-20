import TextButton from "@/components/btnUi/TextButton";
import GuestHeader from "./GuestHeder";
export default function GuestHome() {
  return (
    <>
      <div>
        <div
          className="relative h-screen w-screen"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <GuestHeader />
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 ">
            <div className="text-center">
              <h1 className=" text-white sm:text-6xl">
                해외주식은 <span className="text-bold">아잇나우</span>와 함께!
              </h1>
              <p className="my-6 text-lg leading-8 text-white">
                해외 주식 뉴스 실시간 번역과 <br />
                AI 애널리스트가 알려주는 어려운 해외주식 리포트
              </p>
              <TextButton>로그인</TextButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
