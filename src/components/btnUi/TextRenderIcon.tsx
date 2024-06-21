// renderIcon.tsx
import {
  AI,
  Calender,
  ChatBot,
  Close,
  DownArrow,
  Edit,
  EyeNotSVG,
  EyeSVG,
  Plus,
  RightArrow,
  Search,
  Time,
  Translate,
} from "./Svg";

type TBtnStyle = {
  [key: string]: string;
};

const svgVariants: TBtnStyle = {
  disable: "#C5C5C5",
  grayScale: "#575757",
  warning: "#FFFFFF",
  success: "#FFFFFF",
  outline: "#121212",
  secondary: "#FFFFFF",
};

type TIcon =
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

// 버튼 아이콘 컴포넌트
export const TextRenderIcon = (
  icon: TIcon,
  color?: keyof typeof svgVariants,
  size?: "sm" | "md" | "custom" | "full",
) => {
  const iconProps = {
    color: color ? svgVariants[color] : "white",
    width: size === "sm" ? 18 : 24,
    height: size === "sm" ? 18 : 24,
  };

  switch (icon) {
    case "AI":
      return <AI {...iconProps} />;
    case "Calender":
      return <Calender {...iconProps} />;
    case "ChatBot":
      return <ChatBot {...iconProps} />;
    case "Close":
      return <Close {...iconProps} />;
    case "DownArrow":
      return <DownArrow {...iconProps} />;
    case "Edit":
      return <Edit {...iconProps} />;
    case "EyeNotSVG":
      return <EyeNotSVG {...iconProps} />;
    case "EyeSVG":
      return <EyeSVG {...iconProps} />;
    case "Plus":
      return <Plus {...iconProps} />;
    case "RightArrow":
      return <RightArrow {...iconProps} />;
    case "Search":
      return <Search {...iconProps} />;
    case "Time":
      return <Time {...iconProps} />;
    case "Translate":
      return <Translate {...iconProps} />;
    default:
      return null;
  }
};
