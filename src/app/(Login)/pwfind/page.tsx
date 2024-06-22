"use client";
import { useState } from "react";
import InputExtends from "@/components/Input/Input";
import TextButton from "@/components/btnUi/TextButton";
import AuthModal from "./component/AuthModal";

export default function IdFind() {
  const [nameText, setName] = useState("");
  const [idText, setId] = useState("");
  const [email, setEmail] = useState("");
  const [ismodal, setModal] = useState(false);
  return (
    <>
      <h1 className="  text-h3 font-extrabold">비밀번호 찾기</h1>

      <form className="mt-10 w-full h-auto flex flex-col gap-4 mb-10">
        <div className="w-full h-auto flex flex-col gap-4 mb-[25px]">
          <InputExtends
            id="username"
            placeholder="이름을 입력해주세요"
            label="이름"
            value={nameText}
            onChange={e => setName(e.target.value)}
            autoComplete="username"
          />
          <InputExtends
            id="id"
            type="text"
            placeholder="아이디를 입력해주세요"
            label="아이디"
            value={idText}
            onChange={e => setId(e.target.value)}
            autoComplete="username"
          />
          <InputExtends
            type="text"
            id="email"
            label="이메일주소"
            placeholder="가입 시 입력한 이메일주소를 입력해주세요."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {idText && email && email.includes("@") && nameText ? (
          <TextButton onClick={() => setModal(!ismodal)} size="full">
            임시 비밀번호 발급
          </TextButton>
        ) : (
          <TextButton size="full" color="disable">
            임시 비밀번호 발급
          </TextButton>
        )}
      </form>
      {ismodal && <AuthModal />}
    </>
  );
}
