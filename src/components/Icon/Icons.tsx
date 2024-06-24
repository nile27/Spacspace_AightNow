import { TIconProps } from "../Stock/Icon";

export default function Icons(props: React.SVGProps<SVGSVGElement> & TIconProps) {
  const { name, size = "100%", ...rest } = props;
  return (
    <>
      <svg width={size} height={size} {...rest} xmlns="http://www.w3.org/2000/svg">
        <use href={`/icons/Oauth.svg#${name}`} />
      </svg>
    </>
  );
}
