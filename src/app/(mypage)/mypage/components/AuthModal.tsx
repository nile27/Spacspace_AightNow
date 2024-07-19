"use client";
import { Dispatch, SetStateAction, useState } from "react";
import NewInput from "@/components/Input/NewInput";
import TextButton from "@/components/btnUi/TextButton";
import { TUserData, useAuthStore } from "@/Store/store";
import { firestore } from "@/firebase/firebaseDB";
import { collection, query, where, getDocs } from "firebase/firestore";
import { updateUserInfo } from "../../utills/updateUserInfo";

export default function AuthModal({
  setIdx,
  setIsModal,

  currentPw,
}: {
  currentPw: string;
  setIdx: Dispatch<SetStateAction<number>>;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { user, setUser } = useAuthStore();
  const [inputText, setInput] = useState({
    id: user?.id || user?.userId || "",
    pw: currentPw || "",
    pwCheck: currentPw || "",
    phone: user?.phone || "",
    birth: user?.birth || "",
  });

  const [idCheck, setIdCheck] = useState(false);
  const [errArr, setErrArr] = useState(Array.from({ length: 5 }, () => true));
  const handleInputValue = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...inputText, [key]: e.target.value });
  };

  const handleIdCheck = async () => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
    const copy = [...errArr];
    setIdCheck(true);
    if (!regex.test(inputText.id as string)) {
      errHandler(0);
      return;
    }
    if (inputText.id === user?.id || inputText.id === user?.userId) {
      const copy = Array.from({ length: 5 }, () => true);
      copy[0] = true;
      setErrArr(copy);
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

  const errHandler = (idx: number) => {
    const copy = Array.from({ length: 5 }, () => true);
    copy[idx] = false;
    setErrArr(copy);
  };

  const handleAllCheck = async () => {
    const regexPw =
      /^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$|^(?=.*\d)(?=.*[A-Za-z]|.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$|^(?=.*[!@#$%^&*])(?=.*[A-Za-z]|.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/;
    const regexPhone = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;
    const regexBirth =
      /^(?:\d{2}(0[13578]|1[02])(0[1-9]|[12]\d|3[01])|\d{2}(0[469]|11)(0[1-9]|[12]\d|30)|\d{2}02(0[1-9]|1\d|2[0-9]))$/;

    if (!idCheck) {
      alert("아이디 중복확인을 눌러주세요.");

      return;
    }

    if (currentPw && !regexPw.test(inputText.pw)) {
      errHandler(1);
      return;
    }
    console.log(currentPw);
    if (currentPw && inputText.pw !== inputText.pwCheck) {
      errHandler(2);
      return;
    }

    if (!regexPhone.test(inputText.phone as string)) {
      errHandler(3);
      return;
    }
    if (!regexBirth.test(inputText.birth as string)) {
      errHandler(4);
      return;
    }

    const copy = Array.from({ length: 5 }, () => true);
    setErrArr(copy);

    if (user) {
      const updateResult = await updateUserInfo({
        email: user.email,
        id: inputText.id,
        pw: inputText.pw,
        currentPw: currentPw,
        phone: inputText.phone,
        birth: inputText.birth,
      });

      if (updateResult.success) {
        setUser({
          ...user,
          id: inputText.id,
          phone: inputText.phone,
          birth: inputText.birth,
        } as TUserData);
        alert("정보가 성공적으로 수정되었습니다.");
        setIsModal(false);
      } else {
        alert("정보 수정 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <h1 className=" mb-4 text-h3 font-extrabold">정보 수정</h1>
      <form className=" w-full h-auto flex flex-col gap-3 mb-5">
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
        {user?.logintype === "none" && (
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
            />{" "}
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
          {user?.logintype === "none" ? (
            inputText.id &&
            inputText.birth &&
            inputText.phone &&
            inputText.pw &&
            inputText.pwCheck ? (
              <TextButton size="full" onClick={handleAllCheck}>
                수정하기
              </TextButton>
            ) : (
              <TextButton size="full" color="disable">
                수정하기
              </TextButton>
            )
          ) : inputText.id && inputText.birth && inputText.phone ? (
            <TextButton size="full" onClick={handleAllCheck}>
              수정하기
            </TextButton>
          ) : (
            <TextButton size="full" color="disable">
              수정하기
            </TextButton>
          )}
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => setIdx(3)}
            type="button"
            className=" w-auto h-auto border-b-[1px] border-warning text-warning"
          >
            회원 탈퇴
          </button>
        </div>
      </form>
    </>
  );
}
