import NewInput from "@/components/Input/NewInput";
import SelectInput from "./SelectInput";
import TextButton from "@/components/btnUi/TextButton";
import { useState } from "react";
import QuitSelect from "./QuitSelect";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteUserAccount } from "../../utills/deleteUser";
import { useAuthStore, useLoginStore } from "@/Store/store";
import { signOut } from "next-auth/react";

export default function QuitModal() {
  const [inputText, setInput] = useState({
    pw: "",
    quit: "탈퇴사유를 선택해주세요.",
  });

  const [isSelect, setSelect] = useState(false);
  const { setLogout } = useLoginStore();
  const { user, clearUser } = useAuthStore();
  const navi = useRouter();
  const handleInputValue = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...inputText, [key]: e.target.value });
  };
  const handleQuit = async () => {
    if (user && user.email) {
      const result = await deleteUserAccount({ email: user.email, password: inputText.pw });

      if (result.success) {
        clearUser();
        setLogout();
        window.sessionStorage.clear();

        signOut({ callbackUrl: "/quit" });
      } else {
        alert("회원 탈퇴 중 오류가 발생했습니다: " + result.error);
      }
    }
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
            <TextButton onClick={handleQuit} size="full">
              회원탈퇴
            </TextButton>
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
