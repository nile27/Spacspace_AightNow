import fireStore from "@/firebase/firestore";
import { collection, doc, setDoc } from "firebase/firestore";

export async function stockSearchAdd(stocksToAdd: any[]) {
  const stockList = collection(fireStore, "stockSearchList");
  for (const stock of stocksToAdd) {
    const stockRef = doc(stockList, stock.id);
    try {
      await setDoc(
        stockRef,
        {
          ...stock,
          nameEnLower: stock.nameEn.toLowerCase(),
        },
        { merge: true },
      );
      console.log(`Added or updated ${stock.name}`);
    } catch (e) {
      console.error(`Error adding ${stock.name}: `, e);
    }
  }
  console.log("Stock addition process completed.");
}
