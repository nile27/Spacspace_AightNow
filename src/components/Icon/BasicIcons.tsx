import { TIconProps } from "../Stock/Icon";

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
