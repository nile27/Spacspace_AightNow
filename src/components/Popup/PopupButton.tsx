import Popup, { TPopupProps } from "./Popup";

type TPopupButtonProps = {
  buttonLeft: string;
  buttonRight: string;
} & TPopupProps;

export default function PopupButton(props: TPopupButtonProps) {
  const { buttonLeft, buttonRight } = props;
  return (
    <>
      <div className="flex justify-center items-center gap-2">
        <div className="h-14 px-4 py-2 bg-scaleGray-200  rounded-lg flex justify-center items-center">
          <button className="text-scaleGray-600 text-base font-medium font-['Pretendard'] leading-normal">
            {buttonLeft}
          </button>
        </div>
        <div className="h-14 px-4 py-2 bg-mainNavy-900 rounded-lg flex justify-center items-center">
          <button className=" text-scaleGray-0 text-base font-medium font-['Pretendard'] leading-normal">
            {buttonRight}
          </button>
        </div>
      </div>
    </>
  );
}
