import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Icons from "@/components/Icon/Icons";
import KakaoTalk from "../../../../../public/icons/KakaoTalk.svg";
import Apple from "../../../../../public/icons/Apple.svg";
import Naver from "../../../../../public/icons/Naver.svg";
import Google from "../../../../../public/icons/Google.svg";

type TStyleBtn = React.ComponentProps<"button"> & {
  style?: "kakao" | "apple" | "naver" | "google";
};

export default function OauthBtn({ style, ...restBtnProps }: TStyleBtn) {
  const IconRenderIcon = (icon: string) => {
    switch (icon) {
      case "kakao":
        return <Icons name="KakaoTalk" width="28" height="28" />;

      case "naver":
        return <Icons name="Naver" width="23" height="23" />;
      case "google":
        return <Icons name="Google" width="30" height="30" />;

      default:
        return null;
    }
  };

  const buttonVariants = cva(``, {
    variants: {
      style: {
        default: "bg-white",
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
    <button
      {...restBtnProps}
      className={cn(
        buttonVariants({ style }),
        `  w-[50px] h-[50px] rounded-full border border-black/opacity-20 justify-center items-center gap-2 inline-flex`,
      )}
    >
      {style && IconRenderIcon(style)}
    </button>
  );
}
