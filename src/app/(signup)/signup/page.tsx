"use client";
import { useState } from "react";
import NewInput from "@/components/Input/NewInput";
import { EyeSVG } from "@/components/btnUi/Svg";
import { EyeNotSVG } from "@/components/btnUi/Svg";
import Checkbox from "@/components/Checkbox/Checkbox";
import Link from "next/link";
import TextButton from "@/components/btnUi/TextButton";
import OauthBtn from "./components/OauthBtn";

export default function Login() {
  const [pwHide, setpwHide] = useState(false);
  const [idText, setId] = useState("");
  const [pwText, setPw] = useState("");

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
          value={idText}
          onChange={e => setId(e.target.value)}
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
          value={pwText}
          onChange={e => setPw(e.target.value)}
        />
        <NewInput
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          autoComplete="current-password"
          label="비밀번호 확인"
          id="password"
          value={pwText}
          onChange={e => setPw(e.target.value)}
        />

        <NewInput
          type="tel"
          placeholder="-를 제외한 휴대폰번호를 입력해주세요."
          autoComplete="current-password"
          label="휴대폰번호"
          id="tel"
          value={pwText}
          onChange={e => setPw(e.target.value)}
        />
        <NewInput
          type="number"
          placeholder="생년월일 6자리를 입력해주세요.(예시: 991231)"
          autoComplete="current-password"
          label="생년월일"
          id="number"
          value={pwText}
          onChange={e => setPw(e.target.value)}
        />

        <div className="w-full h-auto mt-6">
          {idText && pwText ? (
            <TextButton size="full">다음</TextButton>
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
