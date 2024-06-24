import MainLanguage from "./components/MainLanguage";
import SideBar from "../components/SideBar";

export default function Language() {
  return (
    <>
      <SideBar index={1} />
      <MainLanguage />
    </>
  );
}
