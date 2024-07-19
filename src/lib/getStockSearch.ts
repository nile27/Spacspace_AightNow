import { TStockSearch } from "@/features/Watchlist/components/WatchListAdd";
import fireStore from "@/firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

const stockSearchList = collection(fireStore, "stockSearchList");

function convertToTStockSearch(doc: any): TStockSearch {
  return {
    id: doc.id,
    name: doc.name,
    nameEn: doc.nameEn,
    symbol: doc.symbol,
    // 필요한 경우 다른 필드도 추가
  };
}

export async function getStockSearch(search: string): Promise<TStockSearch[]> {
  const q = query(
    stockSearchList,
    where("nameEnLower", ">=", search.toLowerCase()),
    where("nameEnLower", "<=", search.toLowerCase() + "\uf8ff"),
  );

  const q2 = query(
    stockSearchList,
    where("name", ">=", search),
    where("name", "<=", search + "\uf8ff"),
  );

  const [querySnapshot1, querySnapshot2] = await Promise.all([getDocs(q), getDocs(q2)]);
  const results1 = querySnapshot1.docs.map(doc => convertToTStockSearch(doc.data()));
  const results2 = querySnapshot2.docs.map(doc => convertToTStockSearch(doc.data()));
  console.log("results2", results2);
  return [...results1, ...results2];
}
