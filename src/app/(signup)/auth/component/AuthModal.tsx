import TextButton from "@/components/btnUi/TextButton";

export default function AuthModal() {
  return (
    <div className=" absolute top-0 z-10 bg-[rgba(0,0,0,0.4)] w-[100%] h-[100%] flex justify-center items-center">
      <div className="w-[20%] min-h-[210px] py-[24px] px-5 flex flex-col gap-5 justify-center items-center  bg-white min-w-[390px] rounded-lg">
        <h2 className="  text-[20px] font-bold text-scaleGray-900 ">인증링크를 전송했습니다.</h2>
        <div className="w-auto h-auto px-7 flex flex-col">
          <span className=" text-center whitespace-wrap ">
            작성한 이메일주소로 인증메일을 전송했습니다.
          </span>
          <span> 메일 확인 후 회원가입을 계속 진행해주세요.</span>
        </div>
        <TextButton size="custom" width={"100%"} height={"100%"}>
          로그인
        </TextButton>
      </div>
    </div>
  );
}
