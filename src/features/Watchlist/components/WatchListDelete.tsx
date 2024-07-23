import TextButton from "@/components/btnUi/TextButton";

type TWatchListDeleteProps = {
  onDelete: () => void;
  onCancel: () => void;
};

export default function WatchListDelete({ onDelete, onCancel }: TWatchListDeleteProps) {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <>
      <div className="fixed inset-0 bg-scaleGray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="w-[386px] bg-white rounded-2xl flex flex-col p-6 z-50">
          <div className="text-xl font-bold mb-4 text-center text-mainNavy-900">
            관심종목을 삭제하시겠습니까?
          </div>
          <div className="w-full flex items-center justify-between  mt-4 ">
            <button onClick={handleDelete}>
              <TextButton size="custom" color="grayScale" width={"160px"} height={"56px"}>
                삭제하기
              </TextButton>
            </button>

            <TextButton size="custom" width={"160px"} height={"56px"} onClick={onCancel}>
              돌아가기
            </TextButton>
          </div>
        </div>
      </div>
    </>
  );
}
