import React, { Dispatch, SetStateAction } from "react";

type NewType = Dispatch<
  SetStateAction<{
    id: string;
    pw: string;
  }>
>;

type TProp = {
  inputText: {
    id: string;
    pw: string;
  };
  setSelect: Dispatch<SetStateAction<boolean>>;
  setInput: NewType;
};

export default function Select({ inputText, setSelect, setInput }: TProp) {
  const selectText = [
    "# 애플 ・ APPL",
    "# 아마존 ・ AMZN",
    "# 테슬라 ・ TSLA",
    "# 구글 ・ GOOGL",
    "# 마이크로소프트 ・ MSFT",
  ];

  const handlerOnclick = (item: string) => {
    setInput({ ...inputText, pw: item });
    setSelect(false);
  };

  return (
    <div className=" absolute top-30 border bg-white border-scaleGray-200 rounded-lg w-full h-auto flex flex-col items-start justify-center">
      {selectText.map((item, idx) => {
        return (
          <input
            value={item}
            key={idx}
            type="button"
            className=" text-start cursor-pointer w-full h-auto flex justify-start items-center p-4 hover:bg-gray-100 "
            onClick={() => handlerOnclick(item)}
          />
        );
      })}
    </div>
  );
}
