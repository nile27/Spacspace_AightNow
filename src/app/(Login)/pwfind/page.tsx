import InputExtends from "@/components/Input/Input";
import TextButton from "@/components/btnUi/TextButton";
import AuthModal from "./component/AuthModal";

export default function IdFind() {
  return (
    <>
      <h1 className="  text-h3 font-extrabold">비밀번호 찾기</h1>

      <form className="mt-10 w-full h-auto flex flex-col gap-4 mb-10">
        <div className="w-full h-auto flex flex-col gap-4 mb-[56px]">
          <InputExtends
            id="username"
            placeholder="이름을 입력해주세요"
            label="이름"
            required
            autoComplete="username"
          />
          <InputExtends
            id="id"
            type="email"
            placeholder="아이디를 입력해주세요"
            label="아이디"
            required
            autoComplete="username"
          />
          <InputExtends
            type="email"
            id="email"
            label="이메일주소"
            placeholder="가입 시 입력한 이메일주소를 입력해주세요."
            required
          />
        </div>

        <TextButton disabled size="full" color="disable">
          임시 비밀번호 발급
        </TextButton>
      </form>
      {false && <AuthModal />}
    </>
  );
}
