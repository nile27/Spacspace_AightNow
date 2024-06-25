import MainProfile from "./componets/MainProfile";
import SideBar from "../components/SideBar";

export default function Mypage() {
  return (
    <>
      <SideBar index={0} />
      <MainProfile />
    </>
  );
}
