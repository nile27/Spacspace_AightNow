export default function SideBarBtn({ children }: { children: string }) {
  return (
    <button className="w-full h-auto text-body2 hover:px-[14px] hover:font-bold hover:border-l-[10px] hover:border-mainNavy-900 hover:text-mainNavy-900 flex justify-start items-center px-[24px] py-[16px]">
      {children}
    </button>
  );
}
