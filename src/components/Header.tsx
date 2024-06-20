import HeaderDark from "../../public/icons/HeaderDark.svg";
export default function Header() {
  const headerItem = ["발견", "뉴스", "관심종목", "마이페이지"];
  return (
    <header className=" w-full h-[80px] py-[8px] bg-white flex flex-row justify-between items-center px-[5vw] ">
      <div className=" w-[65%] flex flex-row justify-between items-center pr-5 ">
        <button>
          <HeaderDark />
        </button>
        {headerItem.map((item, key) => {
          return (
            <button
              key={key}
              className="w-auto p-[10px]  h-full flex justify-center items-center gap-1 hover:border-b-[1px] hover:border-scaleGray-800"
            >
              {item}
            </button>
          );
        })}
      </div>

      <button className="w-[102px] h-[36px] border-[1px]  border-scaleGray-900 rounded-[8px] hover:bg-scaleGray-800 hover:text-white">
        로그아웃
      </button>
    </header>
  );
}
