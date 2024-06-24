export default function SideBarBtn({ children, idx }: { children: string; idx: boolean }) {
  return (
    <>
      {!idx ? (
        <button className="w-full h-auto text-body2 hover:px-[14px] hover:font-bold hover:border-l-[10px] hover:border-mainNavy-900 hover:text-mainNavy-900 flex justify-start items-center px-[24px] py-[16px]">
          {children}
        </button>
      ) : (
        <button className="w-full h-auto text-body2 px-[14px] font-bold border-l-[10px] border-mainNavy-900 text-mainNavy-900 flex justify-start items-center  py-[16px]">
          {children}
        </button>
      )}
    </>
  );
}
