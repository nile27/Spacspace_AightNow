import IconButton from "@/components/btnUi/IconButton";
import { Time } from "@/components/btnUi/Svg";
import { useFindStore } from "./findStore";
import { TFindHistory } from "./SearchEmpty";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}-${day}`;
}

export default function SearchCurrent({
  data,
  onClick,
}: {
  data: TFindHistory;
  onClick: () => void;
}) {
  const deleteSearchHistory = useFindStore(state => state.deleteSearchHistory);
  const handleClick = () => {
    deleteSearchHistory(data.id);
  };
  return (
    <div className="w-full py-2 flex justify-between items-center">
      <div className={`flex justify-between items-center gap-[150px]`}>
        <div className="flex items-center gap-2" onClick={onClick}>
          <Time color="#18254C" width={24} height={24} />
          <div
            className="text-scaleGray-600 text-base font-medium leading-normal w-[293.938px] truncate"
            dangerouslySetInnerHTML={{ __html: data.term }}
          ></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-scaleGray-400 text-sm font-normal leading-tight">
            {formatDate(data.time)}
          </div>
          <IconButton
            icon="Close"
            size="auto"
            color="outline"
            style={{ border: "0px" }}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
