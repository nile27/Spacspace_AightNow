import TextButton from "@/components/btnUi/TextButton";
import Google from "@/../public/icons/Google.svg";
import Kakao from "@/../public/icons/KakaoTalk.svg";
import Apple from "@/../public/icons/Apple.svg";
import Naver from "@/../public/icons/Naver.svg";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type TLogotype = {
  style?: "apple" | "kakao" | "naver" | "google" | undefined;
};

export default function IdFetch({ style }: TLogotype) {
  const IconRenderIcon = (icon: "apple" | "kakao" | "naver" | "google" | undefined) => {
    switch (icon) {
      case "kakao":
        return <Kakao width="15" height="15" />;
      case "apple":
        return <Apple width="15" height="15" />;
      case "naver":
        return <Naver width="12" height="12" />;
      case "google":
        return <Google width="15" height="15" />;

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
    <div className="flex justify-center items-center flex-col gap-10 max-w-[386px] ">
      <div className="flex justify-center items-center flex-col gap-5 w-full h-auto mb-10 ">
        <span className="mt-3">휴대번호와 일치하는 아이디입니다.</span>
        <div className="w-full h-auto p-4 flex justify-center items-center flex-col rounded-lg border-[1px] gap-4 border-scaleGray-300 ">
          <div className="flex justify-center items-center gap-2">
            <span>아이디:</span>
            <div className={cn(buttonVariants({ style }), ` `)}>
              {style && IconRenderIcon(style)}
            </div>

            <span>asjkdnajsknd</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <span>가입일:</span>
            <span>2023.01.04</span>
          </div>
        </div>
      </div>
      <TextButton>로그인하기</TextButton>
    </div>
  );
}
