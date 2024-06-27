"use client";

import { Search } from "@/components/btnUi/Svg";
import SearchEmpty from "./components/SearchEmpty";
import { useState } from "react";
import SearchPanel from "./components/SearchPanel";

function SearchPage() {
  const [search, setSearch] = useState("");
  console.log("searchPage");
  return (
    <>
      <div className="flex justify-center items-start w-full h-full mt-[59px]">
        <div className="flex flex-col gap-12 w-full max-w-7xl">
          <div className="flex-col justify-start items-start gap-8 inline-flex">
            <div className="w-full h-14 flex-col justify-start items-start gap-1 flex">
              <div className="self-stretch p-4 bg-white rounded-lg border border-stone-300 justify-start items-center gap-1 inline-flex">
                <Search color="#9F9F9F" width={24} height={24} />
                <input
                  className="w-full focus:outline-none"
                  placeholder="종목명을 검색해주세요"
                  onChange={e => setSearch(e.target.value)}
                  value={search}
                />
              </div>
            </div>
            {search.trim() === "" ? <SearchEmpty /> : <SearchPanel searchTerm={search} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
