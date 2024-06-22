"use client";
import { useState } from "react";
import NewInput from "@/components/Input/NewInput";

import Link from "next/link";
import TextButton from "@/components/btnUi/TextButton";

export default function Login() {
  const [pwHide, setpwHide] = useState(false);
  const [idText, setId] = useState("");
  const [pwText, setPw] = useState("");
  const [inputText, setInput] = useState({
    id: "",
    pw: "",
    pwCheck: "",
    phone: "",
    birth: "",
  });
  const handleInputValue = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...inputText, [key]: e.target.value });
  };

  return (
    <>
      <h1 className=" mb-10 text-h3 font-extrabold">회원가입</h1>
      <form className=" w-full h-auto flex flex-col gap-4 mb-7">
        <NewInput
          type="text"
          placeholder="아이디를 입력해주세요"
          autoComplete="off"
          label="아이디"
          id="id"
          caption="* 6~12자의 영문, 숫자, _을 이용한 조합"
          value={inputText.id}
          style={"success"}
          onChange={handleInputValue("id")}
        >
          <TextButton size="custom" width="120px" height="auto">
            중복 확인
          </TextButton>
        </NewInput>
        <NewInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          autoComplete="current-password"
          label="비밀번호 입력"
          id="password"
          caption="* 8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합"
          value={inputText.pw}
          onChange={handleInputValue("pw")}
        />
        <NewInput
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          autoComplete="current-password"
          label="비밀번호 확인"
          id="passwordCheck"
          value={inputText.pwCheck}
          onChange={handleInputValue("pwCheck")}
        />

        <NewInput
          type="tel"
          placeholder="-를 제외한 휴대폰번호를 입력해주세요."
          autoComplete="current-password"
          label="휴대폰번호"
          id="tel"
          value={inputText.phone}
          onChange={handleInputValue("phone")}
        />
        <NewInput
          type="text"
          placeholder="생년월일 6자리를 입력해주세요.(예시: 991231)"
          autoComplete="current-password"
          label="생년월일"
          id="number"
          value={inputText.birth}
          onChange={handleInputValue("birth")}
        />

        <div className="w-full h-auto mt-6">
          {inputText.id &&
          inputText.birth &&
          inputText.phone &&
          inputText.pw &&
          inputText.pwCheck ? (
            <Link href={"/signup/profile"}>
              <TextButton size="full">다음</TextButton>
            </Link>
          ) : (
            <TextButton size="full" color="disable">
              다음
            </TextButton>
          )}
        </div>
      </form>
    </>
  );
}
