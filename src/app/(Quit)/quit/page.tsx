import TextButton from "@/components/btnUi/TextButton";
import Link from "next/link";
export default function Quit() {
  return (
    <>
      <div className="w-full h-auto flex flex-col justify-start items-center mb-[56px] gap-[24px]">
        <h1 className="  text-h3 font-bold">회원탈퇴가 완료되었습니다.</h1>
        <div className=" w-full h-auto p-2 gap-2 flex flex-col items-center justify-center">
          <span className="text-center">아잇나우를 이용해주셔서 감사합니다.</span>
          <span className="text-center">더욱 더 노력하고 발전하는 아잇나우가 되겠습니다.</span>
        </div>
      </div>
      <Link href={"/"} className="w-full h-auto">
        <TextButton size="full">확인하기</TextButton>
      </Link>
    </>
  );
}
