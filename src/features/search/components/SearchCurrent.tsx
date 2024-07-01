import IconButton from "@/components/btnUi/IconButton";
import { Time } from "@/components/btnUi/Svg";

export default function SearchCurrent({ data }: { data: { name: string; date: string } }) {
  return (
    <div className="w-full py-2 flex justify-between items-center">
      <div className="flex justify-between items-center gap-[400px]">
        <div className="flex items-center gap-2">
          <Time color="#18254C" width={24} height={24} />
          <div className="text-scaleGray-600 text-base font-medium leading-normal">{data.name}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-scaleGray-400 text-sm font-normal leading-tight">{data.date}</div>
          <IconButton icon="Close" size="auto" color="outline" style={{ border: "0px" }} />
        </div>
      </div>
    </div>
  );
}
