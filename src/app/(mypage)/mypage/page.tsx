import MainProfile from "../components/MainProfile";
import SideBar from "../components/SideBar";

export default function page() {
  return (
    <article className=" w-full h-auto">
      <h1 className=" w-full h-auto text-h4 font-bold text-mainNavy-900 mb-5">마이페이지</h1>
      <div className=" w-full h-auto flex gap-2">
        <SideBar />
        <MainProfile />
      </div>
    </article>
  );
}
