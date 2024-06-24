import React, { Dispatch, SetStateAction } from "react";

type NewType = Dispatch<
  SetStateAction<{
    quit: string;
    pw: string;
  }>
>;

type TProp = {
  inputText: {
    quit: string;
    pw: string;
  };
  setSelect: Dispatch<SetStateAction<boolean>>;
  setInput: NewType;
};

export default function QuitSelect({ inputText, setSelect, setInput }: TProp) {
  const selectText = [
    "이용이 불편하고 장애가 많아서",
    "다른 서비스가 더 좋아서",
    "사용 빈도가 낮아서",
    "콘텐츠 불만",
    "기타",
  ];

  const handlerOnclick = (item: string) => {
    setInput({ ...inputText, quit: item });
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
