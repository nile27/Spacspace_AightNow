import InputExtends from "@/components/Input/Input";
import TextButton from "@/components/btnUi/TextButton";
import IdFetch from "./component/IdFetch";

export default function IdFind() {
  return (
    <>
      <h1 className="  text-h3 font-extrabold">아이디 찾기</h1>
      {0 ? (
        <form className="mt-10 w-full h-auto flex flex-col gap-4 mb-10">
          <div className="w-full h-auto flex flex-col gap-4 mb-[56px]">
            <InputExtends
              id="id"
              type="email"
              placeholder="아이디를 입력해주세요"
              label="아이디"
              required
              autoComplete="username"
            ></InputExtends>
            <InputExtends
              type="tel"
              id="tel"
              label="전화번호"
              placeholder="-를 제외한 휴대폰번호를 입력해주세요."
              required
            />
          </div>

          <TextButton disabled size="full" color="disable">
            로그인
          </TextButton>
        </form>
      ) : (
        <IdFetch />
      )}
    </>
  );
}
