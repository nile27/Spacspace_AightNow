import TextButton from "@/components/btnUi/TextButton";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
interface AuthModalProps {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

export default function AuthModal({ setIsModal }: AuthModalProps) {
  return (
    <div className=" fixed top-[0] z-50 bg-[rgba(0,0,0,0.4)] w-[100vw] h-[110vh] flex justify-center items-center">
      <div className="w-[20%] min-h-[210px] py-[24px] px-5 flex flex-col gap-5 justify-center items-center  bg-white min-w-[390px] rounded-lg">
        <h2 className="  text-[20px] font-bold text-scaleGray-900 ">인증링크를 전송했습니다.</h2>
        <div className="w-auto h-auto px-7 flex flex-col">
          <span className=" text-center whitespace-wrap ">
            작성한 이메일주소로 인증메일을 전송했습니다.
          </span>
          <span> 메일 확인 후 회원가입을 계속 진행해주세요.</span>
        </div>

        <TextButton size="custom" width={"100%"} height={"100%"} onClick={() => setIsModal(false)}>
          확인
        </TextButton>
      </div>
    </div>
  );
}
