"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type TInputProps = {
  children?: React.ReactNode;
  style: string;
} & React.ComponentProps<"input">;

export default function SelectInput(props: TInputProps) {
  const { children, onChange, style, ...restProps } = props;

  return (
    <>
      <div className="min-w-[386px] w-full h-auto min-h-[56px] flex-col justify-start items-start gap-1 inline-flex">
        <label
          htmlFor="관심 종목"
          className={`text-base font-medium font-['Pretendard'] mb-1 leading-normal`}
        >
          관심 종목
        </label>

        <div
          className={`has-[:focus]:border-secondBlue-500  min-h-[56px] w-full px-4 py-2.5 bg-white rounded-lg border-[1px]  group-focus:border-secondBlue-500  justify-start items-center gap-4 inline-flex`}
        >
          <input
            className={` text-start w-[100%] ${style} text-base font-normal leading-normal focus:outline-none `}
            onChange={onChange}
            {...restProps}
          />
          {children}
        </div>
      </div>
    </>
  );
}
