import Icon from "./Icon";

type TStock = {
  logo: string;
  gap?: string;
  data: {
    reutersCode: string;
    stockName: string;
    symbolCode: string;
    closePrice: string;
    compareToPreviousPrice: {
      text: string;
    };
    compareToPreviousClosePrice: string;
    fluctuationsRatio: string;
  };
};

export default function Stock(props: TStock) {
  const {
    gap,
    data: {
      reutersCode,
      stockName,
      symbolCode,
      closePrice,
      compareToPreviousPrice,
      compareToPreviousClosePrice,
      fluctuationsRatio,
    },
  } = props;
  console.log("Stock");

  return (
    <>
      <button className="flex flex-col  justify-start items-start ">
        <div className="flex-col justify-start items-center flex">
          <div className={`w-full ${gap} py-2 flex justify-between items-center`}>
            <div className="flex justify-start items-center gap-4">
              <div className="flex items-center">
                <Icon name={`Stock${reutersCode}`} size={50} />
              </div>
              <div className="flex flex-col justify-start items-start">
                <div className="text-neutral-900 text-base font-bold font-['Pretendard'] leading-normal">
                  {stockName}
                </div>
                <div className="text-neutral-900 text-sm font-normal font-['Pretendard'] leading-tight">
                  {symbolCode}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-y-2">
              <div className="text-right text-neutral-900 text-sm font-medium font-['Pretendard'] leading-tight">
                ${closePrice}
              </div>
              <div className="flex justify-end items-start gap-2">
                <div
                  className={`text-right ${
                    compareToPreviousPrice.text === "하락" ? "text-secondBlue-500" : "text-warning"
                  } text-xs font-normal font-['Pretendard'] leading-none`}
                >
                  {compareToPreviousPrice.text === "하락" ? "▼" : "▲"}
                  {compareToPreviousClosePrice}
                </div>
                <div
                  className={`text-right ${
                    compareToPreviousPrice.text === "하락" ? "text-secondBlue-500" : "text-warning"
                  } text-xs font-normal font-['Pretendard'] leading-none`}
                >
                  {compareToPreviousPrice.text === "하락" ? "-" : "+"}
                  {fluctuationsRatio}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </>
  );
}
