import TextButton from "@/components/btnUi/TextButton";
import Link from "next/link";

export default function Signduble() {
  return (
    <section className="bg-background w-[100vw] min-h-[100vh] flex justify-center items-center flex-col p-20  overflow-y-scroll ">
      <div className="absolute top-[15%] rounded-3xl w-[590px] pb-10  px-[102px] py-[50px] bg-white flex flex-col justify-start items-center   ">
        <div className="w-full h-auto flex flex-col justify-start items-center mb-[56px] gap-[24px]">
          <h1 className="  text-[30px] font-bold">이미 회원가입이 되어 있습니다.</h1>
          <div className=" w-full h-auto p-2 gap-2 flex flex-col items-center justify-center">
            <span className="text-center">로그인 후 이용해주세요!</span>
          </div>
        </div>
        <Link href={"/login"} className="w-full h-auto">
          <TextButton size="full">로그인하기</TextButton>
        </Link>
      </div>
    </section>
  );
}
