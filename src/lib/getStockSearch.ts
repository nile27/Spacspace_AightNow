import fireStore from "@/firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

const stockSearchList = collection(fireStore, "stockSearchList");

export async function getStockSearch(search: string) {
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
  const results1 = querySnapshot1.docs.map(doc => doc.data());
  const results2 = querySnapshot2.docs.map(doc => doc.data());

  return [...results1, ...results2];
}
