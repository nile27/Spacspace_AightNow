import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import KakaoTalk from "../../../../public/icons/KakaoTalk.svg";
import Apple from "../../../../public/icons/Apple.svg";
import Naver from "../../../../public/icons/Naver.svg";
import Google from "../../../../public/icons/Google.svg";

type TStyleBtn = React.ComponentProps<"button"> & {
  style?: "kakao" | "apple" | "naver" | "google";
};

export default function OauthBtn({ style }: TStyleBtn) {
  const IconRenderIcon = (icon: string) => {
    switch (icon) {
      case "kakao":
        return <KakaoTalk />;
      case "apple":
        return <Apple />;
      case "naver":
        return <Naver />;
      case "google":
        return <Google />;

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
      className={cn(
        buttonVariants({ style }),
        `  w-[72px] h-[72px] rounded-full border border-black/opacity-20 justify-center items-center gap-2 inline-flex`,
      )}
    >
      {style && IconRenderIcon(style)}
    </button>
  );
}
