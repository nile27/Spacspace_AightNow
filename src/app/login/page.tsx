import InputExtends from "@/components/Input/Input";
import { EyeSVG } from "@/components/btnUi/Svg";
import Checkbox from "@/components/Checkbox/Checkbox";
import Link from "next/link";
import TextButton from "@/components/btnUi/TextButton";
import OauthBtn from "./components/OauthBtn";
export default function Login() {
  return (
    <section className=" bg-background w-[100vw] h-[100vh] flex justify-center items-center">
      <div className=" rounded-3xl w-[30%] h-auto p-10 bg-white flex flex-col justify-center items-center">
        <h1 className=" mb-10 text-h3 font-extrabold">로그인</h1>
        <form className=" w-full h-auto flex flex-col gap-4 mb-10">
          <InputExtends
            type="email"
            placeholder="아이디를 입력해주세요"
            required
            autoComplete="username"
          ></InputExtends>
          <InputExtends
            type="password"
            placeholder="비밀번호를 입력해주세요"
            required
            autoComplete="current-password"
          >
            <button>
              <EyeSVG color="#C5C5C5" width={25} height={25} />
            </button>
          </InputExtends>
          <div className="w-full h-auto mb-4 flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Checkbox /> <span>자동 로그인</span>
            </div>
            <div className="flex gap-2 items-center">
              <Link href="/">아이디 찾기</Link>
              <span>|</span>
              <Link href="/">비밀번호 찾기</Link>
            </div>
          </div>

          <TextButton size="full">로그인</TextButton>
        </form>

        <div className="mt-3 w-full flex flex-col items-center gap-6">
          <div className="w-full h-auto flex items-center gap-5">
            <div className="border-b-[1px] h-1 w-full border-scaleGray-400"></div>
            <span className=" whitespace-nowrap">또는</span>
            <div className="border-b-[1px] h-1 w-full border-scaleGray-400"></div>
          </div>
          <div className="w-full  flex gap-4  justify-center items-center">
            <OauthBtn style={"kakao"} />
            <OauthBtn style={"naver"} />
            <OauthBtn style={"apple"} />
            <OauthBtn style={"google"} />
          </div>
        </div>
      </div>
    </section>
  );
}
