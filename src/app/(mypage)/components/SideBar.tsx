import Link from "next/link";
import SideBarBtn from "./SideBarBtn";

export default function SideBar({ index }: { index: number }) {
  const sidebarArr = ["개인정보 수정", "언어 설정", "서비스 이용약관"];
  const urlArr = ["/mypage", "/language", "/terms"];

  return (
    <aside className="bg-white rounded-2xl w-[285px] min-h-[720px] py-10 flex flex-col items-start justify-start gap-2">
      {sidebarArr.map((item, idx) => (
        <Link key={idx} href={urlArr[idx]}>
          <SideBarBtn idx={index === idx}>{item}</SideBarBtn>
        </Link>
      ))}
    </aside>
  );
}
