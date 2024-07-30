"use client";
import { useState } from "react";
import NewInput from "@/components/Input/NewInput";
import TextButton from "@/components/btnUi/TextButton";
import AuthModal from "./component/AuthModal";
import { sendVerificationEmail } from "../lib/sendVerificationEmail";
export default function Auth() {
  const [nameText, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isModal, setIsModal] = useState(false);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      await sendVerificationEmail(email, nameText);

      setIsModal(!isModal);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="  text-h3 font-extrabold">본인인증</h1>
      <form className="mt-10 w-full h-auto flex flex-col gap-[24px] mb-10">
        <div className="w-full h-auto flex flex-col gap-4 mb-[30px]">
          <NewInput
            id="username"
            placeholder="이름을 입력해주세요"
            label="이름"
            value={nameText}
            autoComplete="username"
            onChange={e => setName(e.target.value)}
          />
          <NewInput
            type="tel"
            id="tel"
            label="이메일주소"
            value={email}
            placeholder="이메일 주소를 입력해주세요."
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {email && email.includes("@") && nameText ? (
          <TextButton onClick={handleRegister} size="full">
            인증링크 전송
          </TextButton>
        ) : (
          <TextButton size="full" color="disable">
            인증링크 전송
          </TextButton>
        )}
      </form>
      {isModal && <AuthModal setIsModal={setIsModal} />}
    </>
  );
}
