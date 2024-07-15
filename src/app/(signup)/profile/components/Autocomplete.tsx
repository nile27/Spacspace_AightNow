import { useState } from "react";
import { useSignUp } from "@/Store/store";

export default function Autocomplete() {
  const { inputText, setInput, addStock, removeStock } = useSignUp();
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tag = e.target.value;
    setSearch(tag);

    const selectText = [
      "# 애플 ・ APPL",
      "# 아마존 ・ AMZN",
      "# 테슬라 ・ TSLA",
      "# 구글 ・ GOOGL",
      "# 마이크로소프트 ・ MSFT",
    ];

    const filterArr = selectText.filter(item => item.toLowerCase().includes(tag.toLowerCase()));
    setSuggestions(tag ? filterArr : []);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    const splitArr = suggestion.split(" ");
    if (inputText.stock.includes(`${splitArr[1]}`)) {
      setSelectedSuggestion(suggestion);
      setSuggestions([]);
      setSearch("");
      return;
    }

    const dataSymbol = suggestion.split(" ")[1];
    setSelectedSuggestion(suggestion);
    setSuggestions([]);
    addStock(dataSymbol);
    setSearch("");
  };

  const deleteTag = (stock: string) => {
    removeStock(stock);
  };

  return (
    <div className="relative min-w-[386px] w-full h-auto min-h-[56px] flex-col justify-start items-start gap-1 inline-flex">
      <label
        htmlFor="관심 종목"
        className={`text-base font-medium font-['Pretendard'] mb-1 leading-normal`}
      >
        관심 종목
      </label>
      <div className="has-[:focus]:border-secondBlue-500 min-h-[56px] w-full px-4 py-2.5 bg-white rounded-lg border-[1px] group-focus:border-secondBlue-500 justify-start items-center gap-1 inline-flex">
        {inputText.stock &&
          inputText.stock.map((item, idx) => (
            <button
              type="button"
              className="h-auto w-auto whitespace-nowrap cursor-pointer bg-mainNavy-100 rounded-lg px-2"
              onClick={() => deleteTag(item)}
              key={idx}
            >
              {item}
            </button>
          ))}
        <input
          type="text"
          className="text-start w-[100%] text-base font-normal leading-normal focus:outline-none"
          onChange={handleInputChange}
          placeholder="# 관심 종목을 선택해주세요."
          value={search}
        />
      </div>
      <ul className="absolute top-[90px]  bg-white border-scaleGray-200 rounded-lg w-full h-auto flex flex-col items-start justify-center">
        {suggestions.map((suggestion, index) => (
          <li
            className="text-start cursor-pointer w-full h-auto flex justify-start items-center p-4 hover:bg-gray-100"
            key={index}
            onClick={() => handleSelectSuggestion(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}
