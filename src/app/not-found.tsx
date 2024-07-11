import Header from "@/components/Header";
import TextButton from "@/components/btnUi/TextButton";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className={`font-pretendard w-[100vw] h-[100vh] flex flex-col  relative`}>
      <Header />
      <section className="bg-background w-full h-full flex justify-center items-center flex-col  ">
        <div className=" absolute top-[25%] rounded-3xl w-[590px] h-auto  px-[90px] py-[50px] bg-white flex flex-col justify-start items-center  ">
          <div className="w-full h-auto flex flex-col justify-start items-center mb-[56px] gap-[12px]">
            <h1 className="  text-[28px] font-bold whitespace-nowrap">
              요청하신 페이지를 찾을 수 없습니다.
            </h1>
            <div className=" w-full h-auto p-2 gap-2 flex flex-col items-center justify-center">
              <span className="text-center">페이지의 주소가 잘못 입력되었거나</span>
              <span className="text-center whitespace-nowrap">
                주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
              </span>
            </div>
          </div>
          <Link href={"/"} className="w-full h-auto">
            <TextButton size="full">메인으로</TextButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
