"use client";
import React, { useState, useRef } from "react";
import NewInput from "@/components/Input/NewInput";
import TextButton from "@/components/btnUi/TextButton";
import BasicIcon from "@/components/Icon/BasicIcons";
import Autocomplete from "./components/Autocomplete";
import { useSignUp } from "@/Store/store";
import { useRouter } from "next/navigation";
import { handleNickNameCheck, saveImgFile, handleSignUp } from "./utill/profileUtills";

export default function Profile() {
  const [nickNameCheck, setNickNameCheck] = useState(false);
  const [nickNameErr, setNickNameErr] = useState(false);
  const navi = useRouter();
  const { inputText, setInput, labelImg, setLabelImg, imgFile, setImgFile } = useSignUp();
  const imgRef = useRef<HTMLInputElement>(null);

  const handleInputValue = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(key, e.target.value);
  };

  const checkNickName = () => {
    handleNickNameCheck(inputText.nickname, setNickNameErr, setNickNameCheck);
  };

  const saveImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    saveImgFile(e, setImgFile, setLabelImg);
  };

  const handleSignUpClick = async () => {
    try {
      if (imgFile) {
        await handleSignUp(inputText, imgFile, null);
      } else {
        await handleSignUp(inputText, null, labelImg);
      }
      window.sessionStorage.removeItem("signup-storage");
      navi.push("/success");
    } catch (error) {
      console.error("Error signing up:", error);
      // 에러 처리 로직 추가
    }
  };

  return (
    <>
      <h1 className="mb-10 text-h3 font-extrabold">프로필 설정</h1>

      <div className="pb-5 w-full h-auto flex justify-center items-center">
        <label
          htmlFor="profileImg"
          style={{
            backgroundImage: labelImg ? `url(${labelImg})` : `url(/icons/Profile.svg)`,
          }}
          className={`relative w-[120px] h-[120px] bg-cover bg-center cursor-pointer rounded-full`}
        >
          <div className="bg-[#9F9F9F] rounded-full absolute bottom-0 right-0">
            <BasicIcon name="Edit" size={40} color="white" />
          </div>
        </label>

        <input
          type="file"
          accept="image/*"
          id="profileImg"
          onChange={saveImage}
          ref={imgRef}
          className="hidden w-full h-full"
        />
      </div>
      <form className="w-full h-auto flex flex-col gap-4 mb-7">
        <NewInput
          type="text"
          placeholder="닉네임을 입력해주세요."
          autoComplete="off"
          label="닉네임"
          id="nickname"
          value={inputText.nickname}
          style={nickNameCheck ? (nickNameErr ? "success" : "error") : undefined}
          caption={
            nickNameCheck
              ? !nickNameErr
                ? "중복된 닉네임 입니다."
                : "사용 가능한 닉네임입니다."
              : undefined
          }
          onChange={handleInputValue("nickname")}
        >
          {inputText.nickname ? (
            <TextButton onClick={checkNickName} size="custom" width="100px" height="30px">
              중복 확인
            </TextButton>
          ) : (
            <TextButton color="disable" size="custom" width="100px" height="30px">
              중복 확인
            </TextButton>
          )}
        </NewInput>
        <div className="w-full h-auto relative ">
          <Autocomplete />
        </div>

        <div className="w-full h-auto  mt-6">
          {inputText.nickname && inputText.stock.length ? (
            <TextButton onClick={handleSignUpClick} size="custom" width="100%" height="55px">
              다음
            </TextButton>
          ) : (
            <TextButton size="custom" width="100%" height="55px" color="disable">
              다음
            </TextButton>
          )}
        </div>
      </form>
    </>
  );
}
