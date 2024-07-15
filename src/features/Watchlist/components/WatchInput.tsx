"use client";

import BasicIcon from "@/components/Icon/BasicIcons";
import { getStockSearch } from "@/lib/getStockSearch";
import { useEffect, useRef, useState } from "react";
import { TStockSearch } from "./WatchListAdd";

type WatchInputProps = {
  onSearch: (results: TStockSearch[]) => void;
  onSelectStock: (stock: TStockSearch) => void;
};

export default function WatchInput({ onSearch, onSelectStock }: WatchInputProps) {
  const [isShow, setIsShow] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredStocks, setFilteredStocks] = useState<TStockSearch[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (search === "") {
      setFilteredStocks([]);
      return;
    }
    const fetchStocks = async () => {
      const stocks: TStockSearch[] = await getStockSearch(search);
      setFilteredStocks(stocks);
      setSelectedIndex(-1);
    };

    fetchStocks();
  }, [search]);

  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsShow(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex(prev => (prev < filteredStocks.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleSubmit();
    }
  };

  const handleItemClick = (stock: TStockSearch) => {
    setSearch(stock.name);
    setIsShow(false);
    onSelectStock(stock);
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    onSearch(filteredStocks);
    setIsShow(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-[734px] flex items-center ">
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={search}
            onKeyDown={handleKeyDown}
            onChange={searchHandle}
            ref={inputRef}
            className="w-[734px] h-14 rounded-lg border border-scaleGray-400 relative p-2 mb-6 mt-8"
          />
          <button className="sticky mt-2 right-6 ">
            <BasicIcon name="Search" size={24} />
          </button>
        </div>
        {isShow && filteredStocks.length > 0 && (
          <ul className="w-[712px] bg-white border border-scaleGray-400 rounded-lg absolute z-10">
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
                  {stock.name} ({stock.symbol})
                </div>
              </li>
            ))}
          </ul>
        )}
      </form>
      <h2 className="text-mainNavy-900 text-xl">최근 검색한 종목</h2>
    </>
  );
}
