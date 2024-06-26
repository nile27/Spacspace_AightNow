"use client";
import English from "../../../public/icons/English.svg";
import China from "../../../public/icons/China.svg";
import France from "../../../public/icons/France.svg";
import Japan from "../../../public/icons/Japan.svg";
import Korea from "../../../public/icons/Korea.svg";
type TIconButton = React.ComponentProps<"button"> & {
  style: "en" | "ch" | "fr" | "jp" | "kr";
};

export default function LanguageButton(props: TIconButton) {
  const { style, ...restBtnProps } = props;

  // 국기 조건 스타일링
  const renderIcon = (style: TIconButton["style"]) => {
    switch (style) {
      case "kr":
        return <Korea width="72" height="72" />;
      case "en":
        return <English width="72" height="72" />;
      case "ch":
        return <China width="72" height="72" />;
      case "fr":
        return <France width="72" height="72" />;
      case "jp":
        return <Japan width="72" height="72" />;
      default:
        return null;
    }
  };

  // 텍스트 조건 스타일링
  const renderButtonText = (style: TIconButton["style"]) => {
    switch (style) {
      case "kr":
        return "한국어";
      case "en":
        return "영어";
      case "ch":
        return "중국어";
      case "fr":
        return "프랑스어";
      case "jp":
        return "일본어";
      default:
        return "";
    }
  };

  return (
    <>
      <button
        {...restBtnProps}
        className="w-[198px] h-[160px] rounded-lg flex justify-center items-center flex-col gap-1 border-[1px] border-scaleGray-300 text-scaleGray-300 hover:border-secondBlue-600 hover:text-secondBlue-600"
      >
        {renderIcon(style)}
        {renderButtonText(style)}
      </button>
    </>
  );
}
