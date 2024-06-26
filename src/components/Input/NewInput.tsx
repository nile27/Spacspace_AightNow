"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type TInputProps = {
  id?: string;
  label?: string;
  caption?: string | undefined;
  children?: React.ReactNode;
  style?: "error" | "success" | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentProps<"input">;

export default function NewInput(props: TInputProps) {
  const { id, label, caption, children, style, onChange, ...restProps } = props;

  const inputVariants = cva(``, {
    variants: {
      text: {
        default: `text-scaleGray-900 `,
        error: `text-warning`,
        success: `text-success`,
      },
      border: {
        default: `border-scaleGray-200`,
        error: `border-warning`,
        success: "border-sucess",
      },
    },
  });

  return (
    <>
      <div className="min-w-[386px] w-full h-auto min-h-[56px] flex-col justify-start items-start gap-1 inline-flex">
        {id && label && (
          <label
            htmlFor={id}
            className={cn(
              inputVariants({ text: style, border: style }),
              `text-base font-medium font-['Pretendard'] mb-1 leading-normal`,
            )}
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            inputVariants({ text: style, border: style }),
            `has-[:focus]:border-secondBlue-500  min-h-[56px] w-full px-4 py-2.5 bg-white rounded-lg border-[1px]  group-focus:border-secondBlue-500  justify-start items-center gap-4 inline-flex`,
          )}
        >
          <input
            id={id}
            className=" text-start w-[100%] text-neutral-900 text-base font-normal leading-normal focus:outline-none "
            onChange={onChange}
            {...restProps}
          />
          {children}
        </div>
        {caption && (
          <label
            htmlFor={id}
            className={cn(
              inputVariants({ text: style, border: style }),
              "min-w-[386px] mt-1 ml-2 w-full text-[12px] text-warning  font-caption font-['Pretendard'] leading-none",
            )}
          >
            {caption}
          </label>
        )}
      </div>
    </>
  );
}
