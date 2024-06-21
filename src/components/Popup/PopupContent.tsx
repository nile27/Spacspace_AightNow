import { TPopupProps } from "./Popup";

type TPopupContentProps = {
  subTitle?: string;
  content?: string;
};

export default function PopupContent(props: TPopupContentProps) {
  const { subTitle, content } = props;
  return (
    <>
      <div className="relative w-[416px]">
        <div className="flex flex-col justify-start items-center gap-2">
          {subTitle && <div className="text-center text-black text-xl leading-7">{subTitle}</div>}
          <div className="text-center text-scaleGray-900 text-base font-medium leading-normal">
            {content}
          </div>
        </div>
      </div>
    </>
  );
}
