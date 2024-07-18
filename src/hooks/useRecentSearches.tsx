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
    setRecentSearches(prev => {
      const updatedSearches = [
        stock,
        ...prev.filter(s => s.id !== stock.id).slice(0, MAX_RECENT_SEARCHES),
      ];
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  };

  const deleteRecentSearch = (stock: TStockSearch) => {
    const updatedSearches = recentSearches.filter(s => s.name !== stock.name);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
  };

  const clearAllRecentSearches = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

  return { recentSearches, addRecentSearch, deleteRecentSearch, clearAllRecentSearches };
}
