"use client";

import { useState, useCallback, useEffect } from "react";
import TextButton from "@/components/btnUi/TextButton";
import { useAuthStore } from "@/Store/store";
import {
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import fireStore from "@/firebase/firestore";

type AddToWatchListButtonProps = {
  stockName: string;
};

export default function AddToWatchListButton({ stockName }: AddToWatchListButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const user = useAuthStore(state => state.user);

  const handleToggleWatchlist = useCallback(async () => {
    const userId = user?.userId || user?.id;
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const usersRef = collection(fireStore, "users");
      const q = query(usersRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("사용자를 찾을 수 없습니다");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const currentStocks = userData.stock || [];

      if (currentStocks.includes(stockName)) {
        // 이미 추가된 경우 제거
        await updateDoc(userDoc.ref, {
          stock: arrayRemove(stockName),
        });
        setIsAdded(false);
      } else {
        // 추가되지 않은 경우 추가
        await updateDoc(userDoc.ref, {
          stock: arrayUnion(stockName),
        });
        setIsAdded(true);
      }
    } catch (error) {
      console.error("Error toggling stock in watchlist:", error);
      alert("작업 중 오류가 발생했습니다.");
    }
  }, [user, stockName]);

  useEffect(() => {
    const checkIfAdded = async () => {
      const userId = user?.userId || user?.id;
      if (!userId) return;

      try {
        const usersRef = collection(fireStore, "users");
        const q = query(usersRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const currentStocks = userData.stock || [];
          setIsAdded(currentStocks.includes(stockName));
        }
      } catch (error) {
        console.error("Error checking if stock is added:", error);
      }
    };

    checkIfAdded();
  }, [user, stockName]);

  return (
    <div className="hover:opacity-80">
      <TextButton
        size="custom"
        width={"167px"}
        height={"56px"}
        onClick={handleToggleWatchlist}
        color={isAdded ? "outline" : undefined}
      >
        {isAdded ? "관심종목 제거" : "관심종목 추가"}
      </TextButton>
    </div>
  );
}
