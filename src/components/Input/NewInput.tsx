"use client";

import { useState } from "react";

type TInputProps = {
  id?: string;
  label?: string;
  caption?: string;
  children?: React.ReactNode;
  error?: boolean;
  success?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentProps<"input">;

export default function NewInput(props: TInputProps) {
  const { id, label, caption, children, onChange, ...restProps } = props;
  return (
    <>
      <div className="min-w-[386px] w-full h-auto min-h-[56px] flex-col justify-start items-start gap-1 inline-flex">
        {id && (
          <label
            htmlFor={id}
            className="text-scaleGray-900/opacity-20 text-base font-medium font-['Pretendard'] leading-normal"
          >
            {label}
          </label>
        )}
        <div className=" has-[:focus]:border-secondBlue-500  min-h-[56px] w-full px-4 py-2.5 bg-white rounded-lg border-[1px] border-stone-300 group-focus:border-secondBlue-500  justify-start items-center gap-4 inline-flex">
          <input
            id={id}
            className=" w-[100%] text-neutral-900 text-base font-normal leading-normal focus:outline-none "
            onChange={onChange}
            {...restProps}
          />
          {children}
        </div>
        {id && (
          <label
            htmlFor={id}
            className="min-w-[386px] mt-1 w-full text-zinc-700 text-xs font-caption font-['Pretendard'] leading-none"
          >
            {caption}
          </label>
        )}
      </div>
    </>
  );
}
