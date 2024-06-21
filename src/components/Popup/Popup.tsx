import { createJSONStorage } from "zustand/middleware";

export type TPopupProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function Popup(props: TPopupProps) {
  const { title, children } = props;
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="rounded-3xl border p-4 bg-white shadow-lg w-auto">
          <div className="w-full px-2.5 pt-6 pb-4 rounded-tl-3xl rounded-tr-3xl flex justify-center">
            <div className="text-center text-black text-xl font-bold font-['Pretendard'] leading-7">
              {title}
            </div>
          </div>
          <div className="w-full px-2.5 pt-3 pb-4 flex flex-col justify-center items-center gap-4 flex-grow">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
