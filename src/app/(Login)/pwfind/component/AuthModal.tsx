import TextButton from "@/components/btnUi/TextButton";
import Link from "next/link";

export default function AuthModal() {
  return (
    <div className=" fixed top-[0] z-50 bg-[rgba(0,0,0,0.4)] w-[100vw] h-[110vh] flex justify-center items-center">
      <div className="w-[20%] min-h-[210px] py-[24px] px-10 flex flex-col gap-5 justify-center items-center  bg-white min-w-[390px] rounded-lg">
        <h2 className="  text-[20px] font-bold text-scaleGray-900 ">
          임시비밀번호가 발급되었습니다.
        </h2>
        <div className="w-auto h-auto px-7 flex flex-col">
          <span className=" text-center whitespace-wrap ">이메일을 확인하여 임시 비밀번호로</span>
          <span> 재로그인 후 비밀번호를 변경해주세요.</span>
        </div>
        <Link href={"/login"} className="w-full h-auto">
          <TextButton size="custom" width={"100%"} height={"100%"}>
            로그인
          </TextButton>
        </Link>
      </div>
    </div>
  );
}
