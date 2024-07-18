import { useEffect, useState } from "react";
import { TStockSearch } from "../features/Watchlist/components/WatchListAdd";

const MAX_RECENT_SEARCHES = 3;

export default function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<TStockSearch[]>([]);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecentSearches(storedSearches);
  }, []);

  const addRecentSearch = (stock: TStockSearch) => {
    const updatedSearches = [
      stock,
      ...recentSearches.filter(s => s.id !== stock.id).slice(0, MAX_RECENT_SEARCHES),
    ];
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
  };

  const deleteRecentSearch = (stock: TStockSearch) => {
    const updatedSearches = recentSearches.filter(s => s.name !== stock.name);
    setRecentSearches(updatedSearches);
  };

  return { recentSearches, addRecentSearch, deleteRecentSearch };
}
