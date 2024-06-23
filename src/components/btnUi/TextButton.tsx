"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { TextRenderIcon } from "./TextRenderIcon";

type TTextButton = React.ComponentProps<"button"> & {
  children: string;
  size?: "sm" | "md" | "custom" | "full";
  color?: "disable" | "grayScale" | "warning" | "success" | "outline" | "secondary";
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

  width?: string;
  height?: string;
};

export default function TextButton(props: TTextButton) {
  const { children, size, color, width, height, icon, ...restBtnProps } = props;
  // 버튼 스타일링
  const buttonVariants = cva(`rounded-lg whitespace-nowrap`, {
    variants: {
      size: {
        default: `w-[386px] bg-scaleGray-900 h-16 px-2.5 py-[18px] `,
        sm: `w-[386px] h-9 px-2.5 py-2`,
        md: `w-[386px] h-14 px-2.5 py-4`,
        custom: ` px-2.5 py-2 `,
        full: `w-full  min-h-[64px] px-2.5 py-2 `,
      },
      color: {
        default: "bg-mainNavy-900 hover:bg-[#213564]",
        disable: "bg-scaleGray-200 cursor-default ",
        grayScale: "bg-scaleGray-200",
        warning: "bg-warning hover:bg-[#FF5271]",
        success: "bg-success hover:bg-[#33E078]",
        outline: "bg-white border-[1px] border-scaleGray-900 hover:border-scaleGray-800",
        secondary: "bg-secondBlue-500 hover:border-secondBlue-300",
      },
    },
    defaultVariants: {
      size: "default",
      color: `default`,
    },
  });
  // 텍스트 스타일링
  const textVariants = cva(``, {
    variants: {
      size: {
        default: `font-body3`,
        sm: `font-body5`,
        md: `font-body4`,
        custom: `font-body3 `,
        full: "font-body3",
      },
      color: {
        default: "text-white ",
        disable: "text-scaleGray-300",
        grayScale: "text-scaleGray-600",
        warning: "text-white",
        success: "text-white",
        outline: "text-scaleGray-900",
        secondary: "text-white",
      },
    },
    defaultVariants: {
      size: "default",
      color: `default`,
    },
  });

  return (
    <>
      <button
        {...restBtnProps}
        type="button"
        className={cn(
          buttonVariants({ size, color }),
          ` ${
            size === "custom" && width && height && `w-[${width}] h-[${height}]`
          } justify-center items-center flex`,
        )}
      >
        {icon && TextRenderIcon(icon, color, size)}
        <span className={cn(textVariants({ size, color }), " text-center")}>{children}</span>
      </button>
    </>
  );
}
