"use client";
import { useState, useRef } from "react";
import NewInput from "@/components/Input/NewInput";
import Link from "next/link";
import TextButton from "@/components/btnUi/TextButton";

export default function Profile() {
  const [inputText, setInput] = useState({
    id: "",
    pw: "",
  });
  // const [imgFile, setImgFile] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const handleInputValue = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...inputText, [key]: e.target.value });
  };

  // const saveImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (!files || files.length === 0) {
  //     setImgFile(null);
  //     return;
  //   }
  //   const file = files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImgFile(reader.result as string);
  //   };
  // };
  return (
    <>
      <h1 className=" mb-10 text-h3 font-extrabold">프로필 설정</h1>
      <form className=" w-full h-auto flex flex-col gap-4 mb-7">
        <NewInput
          type="text"
          placeholder="닉네임을 입력해주세요."
          autoComplete="off"
          label="닉네임"
          id="id"
          value={inputText.id}
          style={"success"}
          onChange={handleInputValue("id")}
        >
          <TextButton size="custom" width="120px" height="auto">
            중복 확인
          </TextButton>
        </NewInput>
        {/* <div>
          <label
            htmlFor="profileImg"
            className={`${imgFile ? `bg-[url(${imgFile})]` : ""}`}
          ></label>
          <input type="file" accept="image/*" id="profileImg" onChange={saveImgFile} ref={imgRef} />
        </div> */}

        <div className="w-full h-auto mt-6">
          {inputText.id && inputText.pw ? (
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
