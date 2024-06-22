"use client";
import { useState } from "react";
import NewInput from "@/components/Input/NewInput";
import TextButton from "@/components/btnUi/TextButton";
import IdFetch from "./component/IdFetch";

export default function IdFind() {
  const [nameText, setName] = useState("");
  const [idText, setId] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <>
      <h1 className="  text-h3 font-extrabold">아이디 찾기</h1>
      {1 ? (
        <form className="mt-10 w-full h-auto flex flex-col gap-4 mb-10">
          <div className="w-full h-auto flex flex-col gap-4 mb-[56px]">
            <NewInput
              id="username"
              placeholder="이름을 입력해주세요"
              label="이름"
              value={nameText}
              autoComplete="username"
              onChange={e => setName(e.target.value)}
            />
            <NewInput
              id="id"
              type="text"
              placeholder="아이디를 입력해주세요"
              label="아이디"
              value={idText}
              autoComplete="username"
              onChange={e => setId(e.target.value)}
            />
            <NewInput
              type="tel"
              id="tel"
              label="전화번호"
              value={phone}
              placeholder="-를 제외한 휴대폰번호를 입력해주세요."
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          {idText && phone && nameText ? (
            <TextButton size="full">아이디 찾기</TextButton>
          ) : (
            <TextButton size="full" color="disable">
              아이디 찾기
            </TextButton>
          )}
        </form>
      ) : (
        <IdFetch />
      )}
    </>
  );
}
