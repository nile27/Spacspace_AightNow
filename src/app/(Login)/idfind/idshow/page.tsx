import TextButton from "@/components/btnUi/TextButton";
import Icon from "@/components/Icon/Icons";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type TLogotype = {
  style?: "kakao" | "naver" | "google" | undefined;
};

export default function IdShow({ style }: TLogotype) {
  const IconRenderIcon = (icon: "kakao" | "naver" | "google" | undefined) => {
    switch (icon) {
      case "kakao":
        return <Icon name="KakaoTalk" size={15} />;

      case "naver":
        return <Icon name="Naver" size={10} />;
      case "google":
        return <Icon name="Google" size={15} />;

      default:
        return null;
    }
  };

  const buttonVariants = cva(`w-[20px] h-[20px] rounded-full flex justify-center items-center`, {
    variants: {
      style: {
        default: "hidden",
        kakao: "bg-[#FFE812]",
        apple: "bg-black",
        naver: "bg-[#00C337]",
        google: "bg-[white]",
      },
    },
    defaultVariants: {
      style: `default`,
    },
  });

  return (
    <>
      <h1 className="  text-h3 font-extrabold">아이디 찾기</h1>
      <div className="flex justify-center items-center flex-col gap-10 max-w-[386px] ">
        <div className="flex justify-center items-center flex-col gap-5 w-full h-auto mb-[30px] ">
          <span className="mt-3">휴대번호와 일치하는 아이디입니다.</span>
          <div className="w-full h-auto p-4 flex justify-center pl-[100px] items-start flex-col rounded-lg border-[1px] gap-4 border-scaleGray-300 ">
            <div className="flex justify-start items-center gap-2 ">
              <span>아이디:</span>
              <div className={cn(buttonVariants({ style }), ` `)}>
                {style && IconRenderIcon(style)}
              </div>

              <span>asjkdnajsknd</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span>가입일:</span>
              <span>2023.01.04</span>
            </div>
          </div>
        </div>
        <Link href={"/login"} className="w-full h-auto">
          <TextButton>로그인하기</TextButton>
        </Link>
      </div>
    </>
  );
}
