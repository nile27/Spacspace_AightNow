"use client";

import BasicIcon from "@/components/Icon/BasicIcons";
import { getStockSearch } from "@/lib/getStockSearch";
import { useEffect, useRef, useState } from "react";
import { TStockSearch } from "./WatchListAdd";
import { useDebounce } from "@/hooks/useDebounce";

import Icon from "@/components/Stock/Icon";
import useRecentSearches from "@/hooks/useRecentSearches";

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
  const debouncedSearch = useDebounce(search, 300);
  const { recentSearches, addRecentSearch, deleteRecentSearch, clearAllRecentSearches } =
    useRecentSearches();

  useEffect(() => {
    setIsShow(search !== "" && filteredStocks.length > 0);
  }, [search, filteredStocks]);

  useEffect(() => {
    console.log("RecentSearches", recentSearches);
  }, [recentSearches]);

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
  }, [debouncedSearch]);

  const handleAllDelete = () => {
    clearAllRecentSearches();
  };

  const handleSelectDelete = (stock: TStockSearch) => {
    deleteRecentSearch(stock);
  };

  const handleRecentSearchClick = async (stock: TStockSearch) => {
    setSearch(stock.name);
    const results = await getStockSearch(stock.name);
    setFilteredStocks(results);

    onSearch(results);
  };

  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex(prev => (prev < filteredStocks.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSubmit();
      handleSelectStock(filteredStocks[selectedIndex]);
      setSearch("");
    }
  };

  const handleSelectStock = (stock: TStockSearch) => {
    onSelectStock(stock);
    addRecentSearch(stock);
    handleSubmit();
    setSearch("");
  };

  const handleItemClick = (stock: TStockSearch, e?: React.MouseEvent<HTMLElement>) => {
    if (e) e.preventDefault();
    onSelectStock(stock);
    addRecentSearch(stock);
    handleSubmit();
    setSearch("");
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    onSearch(filteredStocks);
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
          <ul className="w-[712px] bg-white border border-scaleGray-400 rounded-lg  ">
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
      {search.length === 0 && recentSearches.length > 0 && (
        <div className="w-[714px] ">
          <div className="w-full flex justify-between">
            <h2 className="text-mainNavy-900 text-xl">최근 검색한 종목</h2>
            <button onClick={handleAllDelete}>
              <span className="text-scaleGray-600 underline">전체삭제</span>
            </button>
          </div>
          <ul className="w-[712px] bg-white border border-scaleGray-400 rounded-lg">
            {recentSearches.map(stock => (
              <li
                key={stock.id}
                className="p-2 hover:bg-gray-100 cursor-pointer flex gap-4 items-center rounded-lg"
                onClick={() => handleRecentSearchClick(stock)}
              >
                <div className=" flex items-center flex-grow ml-2">
                  <Icon name={stock.name} size={32}></Icon>
                  <div className="ml-4">
                    <div className="font-bold">{stock.name}</div>
                    <div className="text-gray-600">{stock.symbol}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">{stock.priceInfo?.closePrice}</span>
                  <span
                    className={`mr-4 ${
                      stock.priceInfo?.compareToPreviousPrice.code === "2"
                        ? "text-rose-500"
                        : "text-blue-500"
                    }`}
                  ></span>
                  <button onClick={() => handleSelectDelete(stock)}>
                    <BasicIcon name="Close" size={32} color="#575757"></BasicIcon>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
