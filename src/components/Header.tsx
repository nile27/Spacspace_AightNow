import HeaderDark from "../../public/icons/HeaderDark.svg";
import Link from "next/link";
export default function Header({
  background = "white",
  isLogin = false,
}: {
  background?: string;
  isLogin?: boolean;
}) {
  const headerItem = ["발견", "뉴스", "관심종목", "마이페이지"];
  const addressItem = ["/", "/", "/", "/mypage"];
  return (
    <header
      className={`fixed top-0 w-full h-[80px] py-[8px] bg-${background} flex flex-row justify-between items-center px-[5vw] `}
    >
      <div className=" w-[65%] flex flex-row justify-between items-center pr-5 ">
        <button>
          <HeaderDark />
        </button>
        {headerItem.map((item, key) => {
          return (
            <Link href={addressItem[key]} key={key}>
              <button className="p-[10px] w-[160px] h-full flex justify-center items-center gap-1 hover:border-b-[1px] hover:border-scaleGray-800">
                {item}
              </button>
            </Link>
          );
        })}
      </div>

      {isLogin && (
        <button className="w-[102px] h-[36px] border-[1px]  border-scaleGray-900 rounded-[8px] hover:bg-scaleGray-800 hover:text-white">
          로그아웃
        </button>
      )}
    </header>
  );
}
