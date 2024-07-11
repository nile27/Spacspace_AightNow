"use client";
import TextButton from "@/components/btnUi/TextButton";
import Link from "next/link";
import { signOut } from "next-auth/react";
export default function Success() {
  return (
    <>
      <div className="w-full h-auto flex flex-col justify-start items-center mb-[56px] gap-[24px]">
        <h1 className="  text-h3 font-bold">가입이 완료되었습니다.</h1>
        <div className=" w-full h-auto p-2 gap-2 flex flex-col items-center justify-center">
          <span className="text-center">회원가입이 완료되었습니다.</span>
          <span className="text-center">로그인 후 이용해주세요!</span>
        </div>
      </div>

      <TextButton onClick={() => signOut({ callbackUrl: "/login" })} size="full">
        로그인하기
      </TextButton>
    </>
  );
}
