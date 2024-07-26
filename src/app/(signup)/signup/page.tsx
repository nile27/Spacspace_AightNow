"use client";
import React, { useEffect, useState } from "react";
import NewInput from "@/components/Input/NewInput";
import { useRouter, useSearchParams } from "next/navigation";
import TextButton from "@/components/btnUi/TextButton";
import { useSignUp } from "@/Store/store";
import { firestore } from "@/firebase/firebaseDB";
import { useSession, getSession } from "next-auth/react";

import { collection, query, where, getDocs } from "firebase/firestore";
import { generatePassword } from "../lib/generatePassword";

export default function SignUp() {
  const navigation = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const { inputText, setInput, setLabelImg } = useSignUp();
  const [idCheck, setIdCheck] = useState(false);
  const [errArr, setErrArr] = useState(Array.from({ length: 5 }, () => true));

  const handleInputValue = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(key, e.target.value);
  };

  const errHandler = (idx: number) => {
    const copy = Array.from({ length: 5 }, () => true);
    copy[idx] = false;
    setErrArr(copy);
  };

  const handleIdCheck = async () => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
    const copy = [...errArr];
    setIdCheck(true);
    if (!regex.test(inputText.id)) {
      errHandler(0);
      return;
    }
    try {
      const userRef = collection(firestore, "users");
      const q = query(userRef, where("userId", "==", inputText.id));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        errHandler(0);
      } else {
        copy[0] = true;
        setErrArr(copy);
      }
    } catch (error) {
      console.error("Error checking ID: ", error);
      alert("아이디 확인 중 오류가 발생했습니다.");
    }
  };

  const handleAllCheck = () => {
    const regexPw =
      /^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$|^(?=.*\d)(?=.*[A-Za-z]|.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$|^(?=.*[!@#$%^&*])(?=.*[A-Za-z]|.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/;
    const regexPhone = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;
    const regexBirth =
      /^(?:\d{2}(0[13578]|1[02])(0[1-9]|[12]\d|3[01])|\d{2}(0[469]|11)(0[1-9]|[12]\d|30)|\d{2}02(0[1-9]|1\d|2[0-9]))$/;

    if (!idCheck) {
      alert("아이디 중복확인을 눌러주세요.");
      return;
    }

    if (!regexPw.test(inputText.pw)) {
      errHandler(1);
      return;
    }
    if (inputText.pw !== inputText.pwCheck) {
      errHandler(2);
      return;
    }

    if (!regexPhone.test(inputText.phone)) {
      errHandler(3);
      return;
    }
    if (!regexBirth.test(inputText.birth)) {
      errHandler(4);
      return;
    }

    const copy = Array.from({ length: 5 }, () => true);
    setErrArr(copy);

    navigation.push("/profile");
  };

  useEffect(() => {
    const emailParam: string = searchParams.get("email") as string;
    const nameParam: string = searchParams.get("name") as string;
    const type: string = searchParams.get("type") as string;

    if (emailParam && nameParam) {
      setInput("email", emailParam);
      setInput("name", nameParam);
    }

    if (type) {
      const paramArr = ["name", "email"];
      setLabelImg(searchParams.get("profile_image") as string);
      setInput("logintype", type);
      for (let i of paramArr) {
        setInput(i, searchParams.get(i) as string);
      }
    }
    if (inputText.logintype !== "none") {
      const newRandomPw = generatePassword();
      setInput("pw", newRandomPw);
      setInput("pwCheck", newRandomPw);
    }
    console.log("inputText:", inputText);
    console.log("session:", session);
  }, []);

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
          caption={
            idCheck
              ? errArr[0]
                ? "사용 가능한 아이디입니다."
                : "중복된 아이디이거나, 조합이 맞지 않습니다."
              : "* 6~12자의 영문, 숫자를 이용한 조합"
          }
          value={inputText.id}
          style={idCheck ? (!errArr[0] ? "error" : "success") : undefined}
          onChange={handleInputValue("id")}
        >
          {inputText.id ? (
            <TextButton onClick={handleIdCheck} size="custom" width="100px" height="30px">
              중복 확인
            </TextButton>
          ) : (
            <TextButton color="disable" size="custom" width="100px" height="30px">
              중복 확인
            </TextButton>
          )}
        </NewInput>
        {inputText.logintype === "none" && (
          <>
            <NewInput
              type="password"
              placeholder="비밀번호를 입력해주세요"
              autoComplete="current-password"
              label="비밀번호 입력"
              id="password"
              caption="* 8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합"
              value={inputText.pw}
              style={!errArr[1] ? "error" : undefined}
              onChange={handleInputValue("pw")}
            />
            <NewInput
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              autoComplete="current-password"
              label="비밀번호 확인"
              id="passwordCheck"
              style={!errArr[2] ? "error" : undefined}
              caption={!errArr[2] ? "비밀번호가 맞지 않습니다." : undefined}
              value={inputText.pwCheck}
              onChange={handleInputValue("pwCheck")}
            />
          </>
        )}

        <NewInput
          type="tel"
          placeholder="-를 제외한 휴대폰번호를 입력해주세요."
          autoComplete="current-password"
          label="휴대폰번호"
          style={!errArr[3] ? "error" : undefined}
          caption={!errArr[3] ? "휴대폰번호를 입력해주세요.(예시 01012345678)" : undefined}
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
          style={!errArr[4] ? "error" : undefined}
          caption={!errArr[4] ? "생년월일을 다시 확인해주세요 (예시: 991231)" : undefined}
          value={inputText.birth}
          onChange={handleInputValue("birth")}
        />

        <div className="w-full h-auto mt-6">
          {inputText.id &&
          inputText.birth &&
          inputText.phone &&
          inputText.pw &&
          inputText.pwCheck ? (
            <TextButton size="full" onClick={handleAllCheck}>
              다음
            </TextButton>
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
