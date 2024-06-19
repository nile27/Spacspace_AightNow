"use client";

export default function Withdrawal() {
  return (
    <>
      <div className="w-96 h-20 flex-col justify-start items-start gap-1 inline-flex">
        <div className="text-black/opacity-20 text-base font-medium font-['Pretendard'] leading-normal">
          회원탈퇴 사유
        </div>
        <form className="w-96 p-4 bg-white rounded-lg border border-stone-300 justify-start items-center gap-4 inline-flex">
          <label htmlFor="select" className="w-96">
            <select
              name="reason"
              id="select"
              className="w-[314px] text-neutral-400 text-base font-normal font-['Pretendard'] leading-normal"
            >
              <option value="select">사유를 선택해주세요</option>
              <option value="1">사유1</option>
              <option value="2">사유2</option>
              <option value="3">사유3</option>
              <option value="4">사유4</option>
              <option value="5">사유5</option>
            </select>
          </label>

          <div className="w-6 h-6 relative" />
        </form>
      </div>
    </>
  );
}
