import HeaderLight from "../../../../public/icons/HeaderLight.svg";

export default function GuestHeader() {
  return (
    <header className=" w-full h-[80px] py-[8px] px-[120px] flex flex-row justify-between items-center  ">
      <div className=" w-[65%] flex flex-row justify-between items-center pr-5 ">
        <button>
          <HeaderLight />
        </button>
      </div>
    </header>
  );
}
