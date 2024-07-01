"use client";
import { useShow } from "@/Store/store";
import BasicIcon from "@/components/Icon/BasicIcons";
import { useEffect, useRef, useState } from "react";

const stockName = ["애플", "구글", "테슬라", "아마존", "마이크로소프트", "유니티"];

export default function WatchInput() {
  const [isShow, setIsShow] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredStocks, setFilteredStocks] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { watchList, setWatchList } = useShow();

  useEffect(() => {
    const searchStock = stockName.filter(stock => stock.includes(search));
    setFilteredStocks(searchStock);
    setSelectedIndex(-1);
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
      setSearch(filteredStocks[selectedIndex]);
      setIsShow(false);
    }
  };

  const handleItemClick = (stock: string) => {
    setSearch(stock);
    setIsShow(false);
    setWatchList([search, ...filteredStocks]);
    inputRef.current?.focus();
  };

  console.log(watchList.length);
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
                key={stock}
                className={`p-2 hover:bg-gray-100 cursor-pointer flex gap-4 items-center rounded-lg ${
                  index === selectedIndex ? "bg-gray-200" : ""
                }`}
                onClick={() => handleItemClick(stock)}
              >
                <BasicIcon name="Search" size={24} />
                <div className="w-full flex justify-between items-center">
                  {stock}
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
