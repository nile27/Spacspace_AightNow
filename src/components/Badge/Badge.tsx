import { AI } from "../btnUi/Svg";
export default function Badge({ background, color }: { background?: string; color?: string }) {
  return (
    <>
      <div
        className={`w-[55px] h-8 ${background} rounded flex justify-center items-center p-1 gap-1.5`}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <AI color={`${color}`} />
        </div>
        <div className={`text-${color} text-base font-medium font-['Pretendard'] leading-normal`}>
          AI
        </div>
      </div>
    </>
  );
}

function BadgeReverse({ background, color }: { background: string; color: string }) {
  return (
    <>
      <div
        className={`w-[55px] h-8 ${background} rounded flex justify-center items-center p-1 gap-1.5`}
      >
        <div className={`text-${color} text-base font-medium font-['Pretendard'] leading-normal`}>
          AI
        </div>
        <div className="w-5 h-5 flex items-center justify-center">
          <AI color={`${color}`} />
        </div>
      </div>
    </>
  );
}

function BadgeBlack() {
  return (
    <>
      <Badge background="bg-black" color="white" />
    </>
  );
}

function BadgeGray() {
  return (
    <>
      <Badge background="bg-mainNavy-50" color="#18254C" />
    </>
  );
}

function BadgeBlue() {
  return (
    <>
      <Badge background="bg-secondBlue-50" color="#005A9B" />
    </>
  );
}

export { BadgeBlack, BadgeReverse, BadgeGray, BadgeBlue };
