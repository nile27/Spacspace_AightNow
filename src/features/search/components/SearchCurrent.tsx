import IconButton from "@/components/btnUi/IconButton";
import { Time } from "@/components/btnUi/Svg";

export default function SearchCurrent({ data }: { data: { name: string; date: string } }) {
  return (
    <div className="w-full py-2 flex justify-between items-center">
      <div className="flex justify-between items-center gap-[400px]">
        <div className="flex items-center gap-2">
          <Time color="#9F9F9F" width={24} height={24} />
          <div className="text-zinc-600 text-base font-medium font-['Pretendard'] leading-normal">
            {data.name}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-neutral-400 text-sm font-normal font-['Pretendard'] leading-tight">
            {data.date}
          </div>
          <IconButton icon="Close" size="auto" color="outline" style={{ border: "0px" }} />
        </div>
      </div>
    </div>
  );
}
