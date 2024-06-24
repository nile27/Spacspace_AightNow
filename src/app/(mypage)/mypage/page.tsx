import MainProfile from "./components/MainProfile";
import SideBar from "../components/SideBar";

export default function Mypage() {
  return (
    <>
      <SideBar index={0} />
      <MainProfile />
    </>
  );
}
