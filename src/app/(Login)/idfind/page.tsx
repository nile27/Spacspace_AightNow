"use client";
import { useState } from "react";
import InputExtends from "@/components/Input/Input";
import TextButton from "@/components/btnUi/TextButton";
import Link from "next/link";

export default function IdFind() {
  const [nameText, setName] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <>
      <h1 className="  text-h3 font-extrabold">아이디 찾기</h1>

      <form className="mt-10 w-full h-auto flex flex-col gap-4 mb-10">
        <div className="w-full h-auto flex flex-col gap-4 mb-[30px]">
          <InputExtends
            id="username"
            placeholder="이름을 입력해주세요"
            label="이름"
            value={nameText}
            autoComplete="username"
            onChange={e => setName(e.target.value)}
          />

          <InputExtends
            type="tel"
            id="tel"
            label="전화번호"
            value={phone}
            placeholder="-를 제외한 휴대폰번호를 입력해주세요."
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        {phone && nameText ? (
          <Link className="w-full h-auto" href={"/idfind/idshow"}>
            <TextButton size="full">아이디 찾기</TextButton>
          </Link>
        ) : (
          <TextButton size="full" color="disable">
            아이디 찾기
          </TextButton>
        )}
      </form>
    </>
  );
}
