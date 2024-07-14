"use client";
import { useShow } from "@/Store/store";
import BasicIcon from "@/components/Icon/BasicIcons";
import { getStockSearch } from "@/lib/getStockSearch";
import { stockSearchAdd } from "@/lib/stockSerchAdd";
import { useEffect, useRef, useState } from "react";

export default function WatchInput() {
  const [isShow, setIsShow] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredStocks, setFilteredStocks] = useState<
    Array<{ id: string; name: string; nameEn: string; symbol: string }>
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const stocksToAdd = [
    { id: "AAPL", name: "애플", nameEn: "Apple", symbol: "AAPL" },
    { id: "TSLA", name: "테슬라", nameEn: "Tesla", symbol: "TSLA" },
    { id: "GOOGL", name: "구글", nameEn: "Google", symbol: "GOOGL" },
    { id: "AMZN", name: "아마존", nameEn: "Amazon", symbol: "AMZN" },
    { id: "MSFT", name: "마이크로소프트", nameEn: "Microsoft", symbol: "MSFT" },
    { id: "U", name: "유니티", nameEn: "Unity", symbol: "U" },
  ];

  stockSearchAdd(stocksToAdd);

  useEffect(() => {
    if (search === "") {
      setFilteredStocks([]);
      return;
    }
    const fetchStocks = async () => {
      const stocks: any = await getStockSearch(search);
      setFilteredStocks(stocks);
      setSelectedIndex(-1);
    };

    fetchStocks();
  }, [search]);

  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
    setIsShow(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex(prev => (prev < filteredStocks.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleItemClick(filteredStocks[selectedIndex]);
    }
  };

  const handleItemClick = (stock: any) => {
    setSearch(stock.name);
    setIsShow(false);

    inputRef.current?.focus();
  };

  return (
    <>
      <form action="">
        <div className="w-[734px] flex items-center ">
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={search}
            onKeyDown={handleKeyDown}
            onChange={searchHandle}
            className="w-[734px] h-14 rounded-lg border border-scaleGray-400 relative p-2 mb-6 mt-8"
          />
          <button className="sticky mt-2 right-6 ">
            <BasicIcon name="Search" size={24} />
          </button>
        </div>
        <h2 className="text-mainNavy-900 text-xl">최근 검색한 종목</h2>
        {isShow && filteredStocks.length > 0 && (
          <ul className=" w-[712px] bg-white border border-scaleGray-400 rounded-lg mt-1">
            {filteredStocks.map((stock, index) => (
              <li
                key={stock.id}
                className={`p-2 hover:bg-gray-100 cursor-pointer flex gap-4 items-center rounded-lg ${
                  index === selectedIndex ? "bg-gray-200" : ""
                }`}
                onClick={() => handleItemClick(stock)}
              >
                <BasicIcon name="Search" size={24} />
                <div className="w-full flex justify-between items-center">
                  {stock.name} {stock.symbol}
                  <button>
                    <BasicIcon name="Close" size={24} className="" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
}
