"use client";
import HeaderDark from "../../public/icons/HeaderDark.svg";
import Link from "next/link";
import { useLoginStore, useAuthStore } from "@/Store/store";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Header({ background = "white" }: { background?: string }) {
  const headerItem = ["발견", "뉴스", "관심종목", "마이페이지"];
  const addressItem = ["/find", "/news", "/watchlist", "/mypage"];
  const { isLoggedIn, setLogout } = useLoginStore();
  const { clearUser } = useAuthStore();
  const navi = useRouter();
  const [mounted, setMounted] = useState(false);

  const handleLogout = () => {
    clearUser();
    setLogout();

    window.sessionStorage.clear();
    signOut({ callbackUrl: "/" });

    navi.push("/");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="fixed z-40 top-0 w-full h-[56px] py-[8px] bg-white flex flex-row justify-between items-center px-[5vw] ">
      <div className=" w-[65%] flex flex-row justify-between gap-2 items-center pr-5 ">
        <Link href={"/"}>
          <button>
            <HeaderDark />
          </button>
        </Link>
        {isLoggedIn &&
          headerItem.map((item, key) => {
            return (
              <Link href={addressItem[key]} key={key}>
                <button className="p-[10px] w-[160px] h-full flex justify-center items-center gap-1  hover:text-mainNavy-900 hover:font-bold">
                  {item}
                </button>
              </Link>
            );
          })}
      </div>

      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="w-[102px] h-[36px] border-[1px]  border-scaleGray-900 rounded-[8px] hover:text-mainNavy-900 hover:font-bold "
        >
          로그아웃
        </button>
      )}
    </header>
  );
}
