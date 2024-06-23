import SideBarBtn from "./SideBarBtn";

export default function SideBar() {
  return (
    <aside className="bg-white rounded-2xl w-[285px] min-h-[720px] py-10 flex flex-col items-start justify-start gap-2">
      <SideBarBtn>개인정보 수정</SideBarBtn>
      <SideBarBtn>언어 설정</SideBarBtn>
      <SideBarBtn>서비스 이용약관</SideBarBtn>
    </aside>
  );
}
