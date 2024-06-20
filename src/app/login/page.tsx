import InputExtends from "@/components/Input/Input";
import { EyeSVG } from "@/components/btnUi/Svg";
export default function Login() {
  return (
    <section className=" bg-background w-[100vw] h-[100vh] flex justify-center items-center">
      <div className=" rounded-3xl w-[40%] h-auto p-10 bg-white flex flex-col justify-center items-center">
        <h1 className=" mb-10 text-h3 font-extrabold">로그인</h1>
        <div className="flex flex-col gap-4">
          <InputExtends placeholder="아이디를 입력해주세요"></InputExtends>
          <InputExtends type="password" placeholder="비밀번호를 입력해주세요">
            <button>
              <EyeSVG color="#C5C5C5" width={25} height={25} />
            </button>
          </InputExtends>
        </div>
      </div>
    </section>
  );
}
