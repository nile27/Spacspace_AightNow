import { TIconProps } from "../Stock/Icon";

// Eye Eyehide,Translate,Calender,Edit,AI,Refresh,Rightarrow,Search,Time,Close,Plus,Downarrow
export default function BasicIcon(props: React.SVGProps<SVGSVGElement> & TIconProps) {
  const { name, color, size = "100%", ...rest } = props;
  return (
    <>
      <svg width={size} height={size} color={color} {...rest} xmlns="http://www.w3.org/2000/svg">
        <use href={`/icons/Basic.svg#${name}`} />
      </svg>
    </>
  );
}
