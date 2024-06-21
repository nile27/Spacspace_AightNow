import CardTitle from "./CardTitle";

export default function LargeCard() {
  return (
    <>
      <div className="w-[592px] h-[420px] justify-center items-center inline-flex">
        <div className="w-[592px] h-[420px] ">
          <img
            className="w-[592px] h-[420px]  rounded-2xl"
            src="https://via.placeholder.com/590x420"
          />
          <CardTitle image="/news.png" />
        </div>
      </div>
    </>
  );
}
