"use client";
import { useState } from "react";
import NewInput from "@/components/Input/NewInput";
import TextButton from "@/components/btnUi/TextButton";
import { useRouter } from "next/navigation";
import { checkEmail } from "../utills/IdFindUtill";

export default function IdFind() {
  const [nameText, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [err, serErr] = useState(true);
  const navigation = useRouter();

  const handlerOnClick = async () => {
    try {
      const data = await checkEmail(nameText, phone);

      if (data) {
        navigation.push(
          `/idfind/idshow?id=${data.userId}&createdata=${data.createTime}&logintype=${data.logintype}`,
        );
      } else {
        serErr(false);
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  return (
    <>
      <h1 className="  text-h3 font-extrabold">아이디 찾기</h1>

      <form className="mt-10 w-full h-auto flex flex-col gap-4 mb-10">
        <div className="w-full h-auto flex flex-col gap-4 mb-[30px]">
          <NewInput
            id="username"
            placeholder="이름을 입력해주세요"
            label="이름"
            value={nameText}
            autoComplete="username"
            style={!err ? "error" : undefined}
            onChange={e => setName(e.target.value)}
          />

          <NewInput
            type="tel"
            id="tel"
            label="전화번호"
            value={phone}
            placeholder="-를 제외한 휴대폰번호를 입력해주세요."
            onChange={e => setPhone(e.target.value)}
            style={!err ? "error" : undefined}
            caption={!err ? "*  등록되지 않은 회원이거나 잘못된 회원정보입니다." : undefined}
          />
        </div>

        {phone && nameText ? (
          <TextButton size="full" onClick={handlerOnClick}>
            아이디 찾기
          </TextButton>
        ) : (
          <TextButton size="full" color="disable">
            아이디 찾기
          </TextButton>
        )}
      </form>
    </>
  );
}
