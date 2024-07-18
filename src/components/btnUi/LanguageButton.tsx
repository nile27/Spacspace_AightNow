"use client";
import English from "../../../public/icons/English.svg";
import China from "../../../public/icons/China.svg";
import France from "../../../public/icons/France.svg";
import Japan from "../../../public/icons/Japan.svg";
import Korea from "../../../public/icons/Korea.svg";
import { useState, useEffect } from "react";
type TIconButton = React.ComponentProps<"button"> & {
  style: "en-US" | "ZH" | "FR" | "JA" | "KO";
  focusBtn: boolean;
};

export default function LanguageButton(props: TIconButton) {
  const { style, focusBtn, ...restBtnProps } = props;
  const [isClient, setIsClient] = useState(false);

  // 국기 조건 스타일링
  const renderIcon = (style: TIconButton["style"]) => {
    switch (style) {
      case "KO":
        return <Korea width="72" height="72" />;
      case "en-US":
        return <English width="72" height="72" />;
      case "ZH":
        return <China width="72" height="72" />;
      case "FR":
        return <France width="72" height="72" />;
      case "JA":
        return <Japan width="72" height="72" />;
      default:
        return null;
    }
  };

  // 텍스트 조건 스타일링
  const renderButtonText = (style: TIconButton["style"]) => {
    switch (style) {
      case "KO":
        return "한국어";
      case "en-US":
        return "영어";
      case "ZH":
        return "중국어";
      case "FR":
        return "프랑스어";
      case "JA":
        return "일본어";
      default:
        return "";
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <button
          {...restBtnProps}
          className={`w-[130px] h-[120px] rounded-lg flex justify-center items-center flex-col gap-1 border-[1px] border-scaleGray-300 text-scaleGray-300 ${
            focusBtn ? "border-secondBlue-600 text-secondBlue-600" : ""
          } hover:border-secondBlue-600 hover:text-secondBlue-600`}
        >
          {renderIcon(style)}
          {renderButtonText(style)}
        </button>
      )}
    </>
  );
}
