"use client";
import NewInput from "@/components/Input/NewInput";
import TextButton from "@/components/btnUi/TextButton";
import { Dispatch, SetStateAction, useState } from "react";

export default function ProfileModal({
  isModal,
  setIsModal,
  setIdx,
}: {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  setIdx: Dispatch<SetStateAction<number>>;
}) {
  const [pw, setPw] = useState("");
  return (
    <div className=" w-full h-auto flex justify-center items-center gap-[24px] flex-col">
      <h1 className=" text-h3 font-extrabold">비밀번호 인증</h1>
      <NewInput
        type="password"
        placeholder="비밀번호를 입력해주세요"
        autoComplete="current-password"
        label="현재 비밀번호 입력"
        id="password"
        value={pw}
        onChange={e => setPw(e.target.value)}
      />
      <div className="w-full h-auto mt-10 ">
        {pw ? (
          <TextButton onClick={() => setIdx(2)} size="full">
            수정하기
          </TextButton>
        ) : (
          <TextButton size="full" color="disable">
            수정하기
          </TextButton>
        )}
      </div>
    </div>
  );
}
