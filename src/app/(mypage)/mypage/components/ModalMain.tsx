"use client";
import NewInput from "@/components/Input/NewInput";
import TextButton from "@/components/btnUi/TextButton";
import { useState, useRef, useEffect } from "react";
import BasicIcon from "@/components/Icon/BasicIcons";
import Link from "next/link";
import Autocomplete from "./Autocomplete";

export default function ModalMain() {
  const [inputText, setInput] = useState<{ nickname: string; stock: string[] }>({
    nickname: "",
    stock: [],
  });
  const [nickNameCheck, setNickNameCheck] = useState(false);
  const [nickNameErr, setNickNameErr] = useState(false);
  const [imgFile, setImgFile] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const handleInputValue = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...inputText, [key]: e.target.value });
  };

  const handleNickNameCheck = () => {
    setNickNameCheck(false);
    setNickNameErr(true);
  };

  const saveImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result as string);
    };
  };

  useEffect(() => {
    console.log(imgFile);
  });

  return (
    <>
      <h1 className="mb-10 text-h3 font-extrabold">프로필 설정</h1>

      <div className="pb-5 w-full h-auto flex justify-center items-center">
        <label
          htmlFor="profileImg"
          style={{
            backgroundImage: imgFile ? `url(${imgFile})` : `url(/icons/Profile.svg)`,
          }}
          className={` relative w-[140px] h-[140px] bg-cover bg-center cursor-pointer rounded-full`}
        >
          <div className="bg-[#9F9F9F] rounded-full absolute bottom-0 right-0">
            <BasicIcon name="Edit" size={40} color="white" />
          </div>
        </label>

        <input
          type="file"
          accept="image/*"
          id="profileImg"
          onChange={saveImgFile}
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
          id="id"
          value={inputText.nickname}
          style={nickNameErr ? (nickNameCheck ? "success" : "error") : undefined}
          caption={
            nickNameErr
              ? !nickNameCheck
                ? "중복된 닉네임 입니다."
                : "사용 가능한 닉네임입니다."
              : undefined
          }
          onChange={handleInputValue("nickname")}
        >
          {inputText.nickname ? (
            <TextButton onClick={handleNickNameCheck} size="custom" width="120px" height="auto">
              중복 확인
            </TextButton>
          ) : (
            <TextButton color="disable" size="custom" width="120px" height="auto">
              중복 확인
            </TextButton>
          )}
        </NewInput>
        <div className="w-full h-auto relative">
          <Autocomplete inputText={inputText} setInput={setInput} />
        </div>

        <div className="w-full h-auto mt-6">
          {inputText.nickname && inputText.stock.length ? (
            <Link href="/success">
              <TextButton size="full">수정하기</TextButton>
            </Link>
          ) : (
            <TextButton size="full" color="disable">
              수정하기
            </TextButton>
          )}
        </div>
      </form>
    </>
  );
}
