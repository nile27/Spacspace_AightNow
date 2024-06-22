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

export default function Input(props: TInputProps) {
  const { id, label, caption, children, onChange, ...restProps } = props;
  return (
    <>
      <div className="w-[386px] h-[104px] flex-col justify-start items-start gap-1 inline-flex">
        {id && (
          <label
            htmlFor={id}
            className="text-scaleGray-900/opacity-20 text-base font-medium font-['Pretendard'] leading-normal"
          >
            {label}
          </label>
        )}
        <div className="w-[386px] px-4 py-2.5 bg-white rounded-lg border border-stone-300 justify-start items-center gap-4 inline-flex">
          <input
            id={id}
            className="w-[314px] text-neutral-900 text-base font-normal leading-normal focus:outline-none"
            onChange={onChange}
            {...restProps}
          />
          {children}
        </div>
        {id && (
          <label
            htmlFor={id}
            className="w-[386px] text-zinc-700 text-xs font-caption font-['Pretendard'] leading-none"
          >
            {caption}
          </label>
        )}
      </div>
    </>
  );
}

function InputExtends(props: TInputProps) {
  const { id, label, caption, children, disabled, error, success, onChange, ...restProps } = props;
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? "border-secondBlue-500" : "border-stone-300";
  const textColor = focused ? "text-secondBlue-500" : "text-zinc-700";
  const errorBorderColor = "border-rose-500";
  const errorColor = "text-rose-500";
  const successColor = "text-[#1FCE65]";

  return (
    <div className="w-[386px] h-[104px] flex-col justify-start items-start gap-1 inline-flex">
      {id && (
        <label
          htmlFor={id}
          className={`text-scaleGray-900/opacity-20 text-base font-medium font-['Pretendard'] leading-normal ${
            error ? errorColor : ""
          }`}
        >
          {label}
        </label>
      )}
      <div
        className={`w-[386px] px-4 py-2.5 ${
          disabled ? " bg-neutral-100" : "bg-white"
        }  rounded-lg border ${borderColor} justify-start items-center gap-4 inline-flex`}
      >
        <input
          id={id}
          className={`w-[314px] text-base font-normal leading-normal focus:outline-none focus:placeholder-secondBlue-500 ${
            disabled ? "cursor-not-allowed bg-neutral-100" : ""
          }`}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          {...restProps}
        />
        {children}
      </div>
      {id && (
        <label
          htmlFor={id}
          className={`w-[386px] text-xs font-medium font-['Pretendard'] leading-none ${textColor}`}
        >
          {caption}
        </label>
      )}
    </div>
  );
}

export { InputExtends };
