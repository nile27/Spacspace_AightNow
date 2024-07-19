"use client";
import { useState } from "react";
import { pwResetEmail } from "../utills/PwResetEmail";
import NewInput from "@/components/Input/NewInput";
import TextButton from "@/components/btnUi/TextButton";
import AuthModal from "./component/AuthModal";

export default function Pwfind() {
  const [inputText, setInput] = useState({
    name: "",
    id: "",
    email: "",
  });
  const [ismodal, setModal] = useState(false);
  const [err, setErr] = useState(true);
  const handleInputValue = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...inputText, [key]: e.target.value });
  };
  const handleOnClick = async () => {
    try {
      await pwResetEmail(inputText.email, inputText.name, inputText.id);
      setModal(!ismodal);
    } catch (error) {
      setErr(false);
    }
  };
  return (
    <>
      <h1 className="  text-h3 font-extrabold">비밀번호 찾기</h1>

      <form className="mt-10 w-full h-auto flex flex-col gap-4 mb-10">
        <div className="w-full h-auto flex flex-col gap-4 mb-[25px]">
          <NewInput
            id="username"
            placeholder="이름을 입력해주세요"
            label="이름"
            value={inputText.name}
            style={!err ? "error" : undefined}
            onChange={handleInputValue("name")}
            autoComplete="username"
          />
          <NewInput
            id="id"
            type="text"
            placeholder="아이디를 입력해주세요"
            label="아이디"
            value={inputText.id}
            style={!err ? "error" : undefined}
            onChange={handleInputValue("id")}
            autoComplete="none"
          />
          <NewInput
            type="text"
            id="email"
            label="이메일주소"
            placeholder="가입 시 입력한 이메일주소를 입력해주세요."
            value={inputText.email}
            style={!err ? "error" : undefined}
            onChange={handleInputValue("email")}
            caption={!err ? "*  등록되지 않은 회원이거나 잘못된 회원정보입니다." : undefined}
          />
        </div>

        {inputText.id && inputText.email && inputText.email.includes("@") && inputText.name ? (
          <TextButton onClick={handleOnClick} size="full">
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
