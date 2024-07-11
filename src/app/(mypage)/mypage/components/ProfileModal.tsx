"use client";
import NewInput from "@/components/Input/NewInput";
import TextButton from "@/components/btnUi/TextButton";
import { useState } from "react";
import { auth } from "@/firebase/firebaseDB";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

export default function ProfileModal({
  currentPw,
  setCurrentPw,
  setIdx,
}: {
  currentPw: string;
  setCurrentPw: React.Dispatch<React.SetStateAction<string>>;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [err, setErr] = useState("");

  const handlePwCheck = async () => {
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error("No authenticated user found");
    }

    const credential = EmailAuthProvider.credential(user.email, currentPw);

    try {
      await reauthenticateWithCredential(user, credential);
      console.log("성공");
      setIdx(2);
      return true; // 비밀번호 확인 성공
    } catch (error) {
      setErr("비밀번호가 잘못되었습니다.");
      return false; // 비밀번호 확인 실패
    }
  };

  return (
    <div className=" w-full h-auto flex justify-center items-center gap-[24px] flex-col">
      <h1 className=" text-h3 font-extrabold">비밀번호 인증</h1>
      <NewInput
        type="password"
        placeholder="비밀번호를 입력해주세요"
        autoComplete="current-password"
        label="현재 비밀번호 입력"
        id="password"
        value={currentPw}
        style={err ? "error" : undefined}
        onChange={e => setCurrentPw(e.target.value)}
        caption={err}
      />
      <div className="w-full h-auto mt-10 ">
        {currentPw ? (
          <TextButton onClick={handlePwCheck} size="full">
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
