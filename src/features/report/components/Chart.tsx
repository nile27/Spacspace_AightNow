import Image from "next/image";

export default function Chart() {
  return (
    <>
      <div className="w-[692px] h-64 flex border bg-white rounded-2xl p-4">
        {/* chart width= 556 + 64 height 192 */}
        {/* <Image src="/chart1.png" alt="chart" width={556} height={192} />
        <Image src="/year.png" alt="year" width={64} height={192} /> */}
      </div>
    </>
  );
}
