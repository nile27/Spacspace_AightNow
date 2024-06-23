import NewInput from "@/components/Input/NewInput";
import SelectInput from "./SelectInput";
import TextButton from "@/components/btnUi/TextButton";
import { useState } from "react";
import QuitSelect from "./QuitSelect";
import Link from "next/link";

export default function QuitModal() {
  const [inputText, setInput] = useState({
    pw: "",
    quit: "탈퇴사유를 선택해주세요.",
  });

  const [isSelect, setSelect] = useState(false);

  const handleInputValue = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...inputText, [key]: e.target.value });
  };

  return (
    <>
      <div className=" w-full h-auto flex justify-center items-center gap-[24px] flex-col">
        <h1 className=" mb-4 text-h3 font-extrabold">회원 탈퇴</h1>

        <div className="w-full h-auto relative">
          <SelectInput
            type="button"
            autoComplete="off"
            value={inputText.quit}
            onClick={() => setSelect(!isSelect)}
            label="회원 탈퇴 사유"
            style={
              inputText.quit === "탈퇴사유를 선택해주세요." ? "text-scaleGray-400" : "text-black"
            }
            onChange={handleInputValue("quit")}
          />

          {isSelect && (
            <QuitSelect inputText={inputText} setSelect={setSelect} setInput={setInput} />
          )}
        </div>

        <NewInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          autoComplete="current-password"
          label="현재 비밀번호 입력"
          id="password"
          value={inputText.pw}
          onChange={handleInputValue("pw")}
        />
        <div className="w-full h-auto mt-5 mb-10 ">
          {inputText.pw && inputText.quit !== "탈퇴사유를 선택해주세요." ? (
            <Link href={"/quit"}>
              <TextButton size="full">회원탈퇴</TextButton>
            </Link>
          ) : (
            <TextButton size="full" color="disable">
              회원탈퇴
            </TextButton>
          )}
        </div>
      </div>
    </>
  );
}
