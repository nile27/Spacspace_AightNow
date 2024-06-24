import SideBar from "../components/SideBar";

export default function page() {
  return (
    <main>
      <h1 className=" w-full h-auto text-h4 font-bold text-mainNavy-900 mb-5">마이페이지</h1>
      <div className=" w-full h-auto flex ">
        <SideBar />
      </div>
    </main>
  );
}
