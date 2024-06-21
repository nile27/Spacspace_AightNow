"use client";

import { IconRenderIcon } from "./IconRenderIcon";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type TIconButton = React.ComponentProps<"button"> & {
  size?: "sm" | "md" | "chatBot" | "auto";

  color?: "disable" | "grayScale" | "warning" | "success" | "outline";
  icon?:
    | "AI"
    | "Calender"
    | "ChatBot"
    | "Close"
    | "DownArrow"
    | "Edit"
    | "EyeNotSVG"
    | "EyeSVG"
    | "Plus"
    | "RightArrow"
    | "Search"
    | "Time"
    | "Translate";
};
type TBtnColor = {
  [key: string]: string;
};
type TBtnSize = {
  [key: string]: number;
};

export default function IconButton(props: TIconButton) {
  // 버튼 스타일링
  const buttonVariants = cva(`rounded-lg`, {
    variants: {
      size: {
        default: `w-16 h-16 p-4 `,
        chatBot: "w-[80px] h-[80px] ",
        md: `w-[56px] h-[56px] p-[16px]`,
        sm: `w-[36px] h-[36px] p-[9px]`,

        auto: "w-auto h-auto p-[4px]",
      },
      color: {
        default: "bg-scaleGray-900",
        disable: "bg-scaleGray-200",
        grayScale: "bg-scaleGray-200",
        warning: "bg-warning",
        success: "bg-success",
        outline: "bg-white border-[1px] border-scaleGray-900",
      },
    },
    defaultVariants: {
      size: "default",
      color: `default`,
    },
  });

  const svgColorVariants: TBtnColor = {
    disable: "#C5C5C5",
    grayScale: "#575757",
    warning: "#FFFFFF",
    success: "#FFFFFF",
    outline: "#121212",
  };

  const svgSizeVariants: TBtnSize = {
    sm: 18,
    md: 24,
    chatBot: 44,
    auto: 24,
  };

  const { children, size, color, icon, ...restBtnProps } = props;

  return (
    <>
      <button
        {...restBtnProps}
        className={cn(
          buttonVariants({ size, color }),
          `rounded-full border border-black/opacity-20 justify-center items-center gap-2 inline-flex`,
        )}
      >
        {icon && IconRenderIcon(icon, color, size)}
        {children}
      </button>
    </>
  );
}
