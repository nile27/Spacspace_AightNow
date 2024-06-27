import TextButton from "@/components/btnUi/TextButton";
import GuestHeader from "./components/GuestHeder";
import Link from "next/link";

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
        >
          <div className="absolute inset-0 bg-[#191919] opacity-50"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-between h-full items-center">
          <GuestHeader />
          <div className="mx-auto max-w-2xl pb-8 sm:pb-6 lg:pb-12 text-center flex flex-col items-center flex-grow justify-center">
            <h1 className="text-white sm:text-6xl">
              해외주식은 <span className="font-bold">아잇나우</span>와 함께!
            </h1>
            <p className="my-6 text-2xl leading-8 text-white">
              해외 주식 뉴스 실시간 번역과 <br />
              AI 애널리스트가 알려주는 어려운 해외주식 리포트
            </p>
            <div>
              <Link href="/login">
                <TextButton>로그인</TextButton>
              </Link>
            </div>
          </div>
          <div
            className="relative w-full h-[200px] lg:mt-[-40px] lg:h-[450px]"
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
