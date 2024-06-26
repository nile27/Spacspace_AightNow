"use client";
import { useState } from "react";
import NewInput from "@/components/Input/NewInput";
import BasicIcon from "@/components/Icon/BasicIcons";
import Checkbox from "@/components/Checkbox/Checkbox";
import Link from "next/link";
import TextButton from "@/components/btnUi/TextButton";
import OauthBtn from "./components/OauthBtn";
import { loginRegExp } from "./utills/utill";
import { error } from "console";

export default function Login() {
  const [pwHide, setpwHide] = useState(false);
  const [idText, setId] = useState("");
  const [pwText, setPw] = useState("");
  const [regExpArr, setRegExpArr] = useState([true, true]);
  const errMessage = {
    id: "*  6~12자의 영문, 숫자, ,_을 이용한 조합",
    pw: "*  8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합",
  };

  const handleOnClick = () => {
    const ok = loginRegExp(idText, pwText);
    setRegExpArr(ok.bool);
    console.log(ok);
  };

  return (
    <>
      <h1 className=" mb-10 text-h3 font-extrabold">로그인</h1>
      <form className=" w-full h-auto flex flex-col gap-4 mb-7">
        <NewInput
          type="text"
          placeholder="아이디를 입력해주세요"
          autoComplete="username"
          value={idText}
          style={!regExpArr[0] ? "error" : undefined}
          caption={!regExpArr[0] ? errMessage.id : undefined}
          onChange={e => setId(e.target.value)}
        ></NewInput>
        <NewInput
          type={pwHide ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요"
          autoComplete="current-password"
          value={pwText}
          style={!regExpArr[0] ? "error" : undefined}
          caption={!regExpArr[0] ? errMessage.id : undefined}
          onChange={e => setPw(e.target.value)}
        >
          {!pwHide ? (
            <button className="w-auto h-auto" type="button" onClick={() => setpwHide(true)}>
              <BasicIcon name="Eye" size={24} color="#C5C5C5" />
            </button>
          ) : (
            <button type="button" onClick={() => setpwHide(false)}>
              <BasicIcon name="Eyehide" size={24} color="#C5C5C5" />
            </button>
          )}
        </NewInput>

        <div className="w-full h-auto mb-4 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Checkbox /> <span>자동 로그인</span>
          </div>
          <div className="flex gap-2 items-center">
            <Link href="/idfind">아이디 찾기</Link>
            <span>|</span>
            <Link href="/pwfind">비밀번호 찾기</Link>
          </div>
        </div>

        {idText && pwText ? (
          <TextButton onClick={handleOnClick} size="full">
            로그인
          </TextButton>
        ) : (
          <TextButton onClick={handleOnClick} size="full" color="disable">
            로그인
          </TextButton>
        )}

        <div className=" w-full flex justify-between items-center py-1">
          <span className="text-center">아직 회원이 아니신가요?</span>
          <Link href={"/auth"} className=" text-secondBlue-600 border-b-2 border-secondBlue-600">
            아잇나우 회원가입
          </Link>
        </div>
      </form>

      <div className=" w-full flex flex-col items-center gap-6">
        <div className="w-full h-auto flex items-center gap-5">
          <div className="border-b-[1px] h-1 w-full border-scaleGray-400"></div>
          <span className=" whitespace-nowrap">또는</span>
          <div className="border-b-[1px] h-1 w-full border-scaleGray-400"></div>
        </div>
        <div className="w-full  flex gap-4  justify-center items-center">
          <OauthBtn style={"kakao"} />
          <OauthBtn style={"naver"} />

          <OauthBtn style={"google"} />
        </div>
      </div>
    </>
  );
}
