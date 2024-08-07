import IconLight from "../../../public/icons/IconLight.svg";

export default function Bot({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex items-start gap-2 mb-4">
        <div className="w-12 h-12 pl-2 pr-2 bg-mainNavy-900 rounded-md flex items-center justify-center">
          <div className="relative">
            <IconLight />
          </div>
        </div>
        <div
          className="p-3 bg-mainNavy-200 rounded-md justify-center items-center gap-2 inline-flex max-w-80"
          style={{ maxWidth: "320px", backgroundColor: "#E6E9EF" }}
        >
          <div className="grow shrink basis-0 text-black text-sm font-normal">{children}</div>
        </div>
      </div>
    </>
  );
}
