import HeaderLight from "../../../public/icons/HeaderLight.svg";

export default function GuestHeader() {
  const headerItem = ["발견", "뉴스", "관심종목", "마이페이지"];
  return (
    <header className=" w-full h-[80px] py-[8px]  flex flex-row justify-between items-center px-[5vw] ">
      <div className=" w-[65%] flex flex-row justify-between items-center pr-5 ">
        <button>
          <HeaderLight />
        </button>
        {headerItem.map((item, key) => {
          return (
            <button
              key={key}
              className="w-auto p-[10px]  h-full flex justify-center items-center gap-1 hover:border-b-[1px] text-scaleGray-0 hover:border-scaleGray-0 "
            >
              {item}
            </button>
          );
        })}
      </div>
    </header>
  );
}
