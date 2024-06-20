import { AI } from "../btnUi/Svg";
export default function Badge({ background, color }: { background?: string; color?: string }) {
  return (
    <>
      <div
        className={`w-[55px] h-8 px-2 py-1 bg-${background} rounded justify-start items-center gap-1 inline-flex`}
      >
        <div className="w-6 h-5 relative">
          <AI color={`${color}`} />
          <div className="w-[13.75px] h-[13.72px] left-[3.75px] top-[2.50px] absolute"></div>
        </div>
        <div
          className={`text-center text-${color} text-base  font-semibold font-['Pretendard'] leading-normal`}
        >
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
        className={`w-[55px] h-8 px-2 py-1 bg-${background} rounded justify-start items-center gap-1 inline-flex`}
      >
        <div
          className={`text-center text-${color} text-base font-semibold font-['Pretendard'] leading-normal`}
        >
          AI
        </div>
        <div className="w-[13.75px] h-[13.72px] left-[3.75px] top-[2.50px] absolute"></div>
        <div className="w-6 h-5 relative">
          <AI color={`${color}`} />
        </div>
      </div>
    </>
  );
}

function BadgeBlack() {
  return (
    <>
      <Badge background="black" color="white" />
    </>
  );
}

function BadgeGray() {
  return (
    <>
      <Badge background="mainNavy-50" color="#18254C" />
    </>
  );
}

function BadgeBlue() {
  return (
    <>
      <Badge background="secondBlue-50" color="#005A9B" />
    </>
  );
}

export { BadgeBlack, BadgeReverse, BadgeGray, BadgeBlue };
