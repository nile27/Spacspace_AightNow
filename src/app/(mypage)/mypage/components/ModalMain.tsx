"use client";
import NewInput from "@/components/Input/NewInput";
import TextButton from "@/components/btnUi/TextButton";
import { useState, useRef } from "react";
import BasicIcon from "@/components/Icon/BasicIcons";
import Link from "next/link";
import Autocomplete from "./Autocomplete";
import { useAuthStore } from "@/Store/store";
import { handleNickNameCheck } from "@/app/(signup)/profile/utill/profileUtills";
import { updateUserProfile } from "../../utills/updateUserProfile";

export default function ModalMain({
  setIsModal,
}: {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user, profile, setProfile, setUser } = useAuthStore();
  const [inputText, setInput] = useState<{ nickname: string; stock: string[] }>({
    nickname: "",
    stock: user?.stock || [],
  });

  const [nickNameCheck, setNickNameCheck] = useState(false);
  const [nickNameErr, setNickNameErr] = useState(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [labelFile, setLabelFile] = useState<string>(profile ? profile : "/icons/Profile.svg");
  const imgRef = useRef<HTMLInputElement>(null);

  const handleInputValue = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...inputText, [key]: e.target.value });
  };

  const checkNickName = () => {
    handleNickNameCheck(inputText.nickname, setNickNameErr, setNickNameCheck);
  };

  const saveImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    setImgFile(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setLabelFile(reader.result as string);
    };
  };

  const handleUpdate = async () => {
    if (!user) return;

    try {
      await updateUserProfile({
        email: user.email,
        nickname: inputText.nickname,
        stock: inputText.stock,
        imageFile: imgFile,
      });
      const updates = {
        nickname: inputText.nickname ? inputText.nickname : user.nickname,
        stock: inputText.stock.length ? inputText.stock : user.stock,
      };

      if (updates.nickname === user.nickname && updates.stock === user.stock && !imgFile) {
        alert("변경된 내용이 없습니다.");
        return;
      }

      setUser({
        ...user,
        nickname: updates.nickname,
        stock: updates.stock,
      });

      setProfile(labelFile);

      alert("프로필이 성공적으로 업데이트되었습니다.");
      setIsModal(false);
      // 필요에 따라 추가 작업 수행
    } catch (error) {
      console.error("프로필 업데이트 중 오류가 발생했습니다:", error);
      alert("프로필 업데이트 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <>
      <h1 className="mb-10 text-h3 font-extrabold">프로필 설정</h1>

      <div className="pb-5 w-full h-auto flex justify-center items-center">
        <label
          htmlFor="profileImg"
          className={`relative w-[120px] h-[120px] bg-cover bg-no-repeat bg-center cursor-pointer rounded-full`}
          style={{
            backgroundImage: `url(${labelFile})`,
          }}
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
          value={inputText.nickname ? inputText.nickname : user?.nickname}
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
        <div className="w-full h-auto relative">
          <Autocomplete inputText={inputText} setInput={setInput} />
        </div>

        <div className="w-full h-auto mt-6">
          <TextButton onClick={handleUpdate} size="full">
            수정하기
          </TextButton>
        </div>
      </form>
    </>
  );
}
