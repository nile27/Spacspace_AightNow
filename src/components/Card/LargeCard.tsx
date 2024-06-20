import CardTitle from "./CardTitle";

export default function LargeCard() {
  return (
    <>
      <div className="w-[592px] h-[420px] justify-center items-center inline-flex">
        <div className="w-[592px] h-[420px] relative">
          <img
            className="w-[592px] h-[420px] left-0 top-0 absolute rounded-2xl"
            src="https://via.placeholder.com/590x420"
          />
          <CardTitle />
        </div>
      </div>
    </>
  );
}
