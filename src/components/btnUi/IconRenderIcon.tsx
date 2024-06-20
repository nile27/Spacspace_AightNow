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

type TBtnColor = {
  [key: string]: string;
};

type TBtnSize = {
  [key: string]: number;
};

const svgColorVariants: TBtnColor = {
  disable: "#C5C5C5",
  grayScale: "#575757",
  warning: "#FFFFFF",
  success: "#FFFFFF",
  outline: "#121212",
};

const svgSizeVariants: TBtnSize = {
  sm: 18,
  md: 24,
  chatBot: 44,
  auto: 24,
};

export const IconRenderIcon = (icon: string, color?: string, size?: string) => {
  const iconProps = {
    color: color ? svgColorVariants[color] : "white",
    width: size ? svgSizeVariants[size] : 32,
    height: size ? svgSizeVariants[size] : 32,
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
