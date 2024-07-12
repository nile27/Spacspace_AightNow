"use client";
import { useState, useEffect } from "react";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/firebase/firebaseDB"; // 적절한 경로로 변경
import { useRouter } from "next/navigation";
import NewInput from "@/components/Input/NewInput";
import BasicIcon from "@/components/Icon/BasicIcons";
import TextButton from "@/components/btnUi/TextButton";
const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [pwHide, setpwHide] = useState<boolean[]>([false, false]);
  const [message, setMessage] = useState<string>("");
  const [err, setErr] = useState(true);

  const navi = useRouter();

  const [oobCode, setOobCode] = useState<string | null>(null);

  useEffect(() => {
    // 클라이언트 측에서만 실행
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("oobCode");
    if (code) {
      setOobCode(code);
    } else {
      setMessage("유효하지 않은 요청입니다.");
    }
  }, []);

  const handleValueCheck = (idx: number) => {
    const copy = [...pwHide];
    copy[idx] = !copy[idx];

    setpwHide(copy);
  };

  const handleResetPassword = async () => {
    const regexPw =
      /^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$|^(?=.*\d)(?=.*[A-Za-z]|.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$|^(?=.*[!@#$%^&*])(?=.*[A-Za-z]|.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/;
    if (newPassword !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      setErr(false);
      return;
    }
    if (!regexPw.test(newPassword)) {
      setMessage("양식을 확인해주세요.");
      setErr(false);
      return;
    }

    if (oobCode) {
      try {
        await confirmPasswordReset(auth, oobCode, newPassword);
        setMessage("비밀번호가 성공적으로 재설정되었습니다.");
        setErr(true);
        navi.push("/login");
      } catch (error) {
        setMessage("비밀번호 재설정 중 오류가 발생했습니다.");
        setErr(false);
        console.error("Error resetting password:", error);
      }
    } else {
      setMessage("유효하지 않은 요청입니다.");
    }
  };

  return (
    <section className="bg-background w-[100vw] min-h-[100vh] flex justify-center items-center flex-col p-20  overflow-y-scroll ">
      <div className="absolute top-[15%] rounded-3xl w-[590px] min-h-[400px]  px-[102px] py-[50px] bg-white flex flex-col justify-start items-center pb-[20px]  ">
        <h1 className="  text-h3 font-extrabold">비밀번호 찾기</h1>

        <form className="mt-10 w-full h-auto flex flex-col gap-4 mb-10">
          <div className="w-full h-auto flex flex-col gap-4 mb-[25px]">
            <NewInput
              type={pwHide[0] ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              autoComplete="current-password"
              value={newPassword}
              style={!err ? "error" : undefined}
              onChange={e => setNewPassword(e.target.value)}
              caption="* 8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합"
            >
              {!pwHide[0] ? (
                <button className="w-auto h-auto" type="button" onClick={() => handleValueCheck(0)}>
                  <BasicIcon name="Eye" size={24} color="#C5C5C5" />
                </button>
              ) : (
                <button type="button" onClick={() => handleValueCheck(0)}>
                  <BasicIcon name="Eyehide" size={24} color="#C5C5C5" />
                </button>
              )}
            </NewInput>

            <NewInput
              type={pwHide[1] ? "text" : "password"}
              placeholder="비밀번호 확인해주세요"
              autoComplete="current-password"
              value={confirmPassword}
              style={!err ? "error" : undefined}
              onChange={e => setConfirmPassword(e.target.value)}
              caption={!err ? message : undefined}
            >
              {!pwHide[1] ? (
                <button className="w-auto h-auto" type="button" onClick={() => handleValueCheck(1)}>
                  <BasicIcon name="Eye" size={24} color="#C5C5C5" />
                </button>
              ) : (
                <button type="button" onClick={() => handleValueCheck(1)}>
                  <BasicIcon name="Eyehide" size={24} color="#C5C5C5" />
                </button>
              )}
            </NewInput>
          </div>

          {true ? (
            <TextButton onClick={handleResetPassword} size="full">
              임시 비밀번호 발급
            </TextButton>
          ) : (
            <TextButton size="full" color="disable">
              임시 비밀번호 발급
            </TextButton>
          )}
        </form>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
