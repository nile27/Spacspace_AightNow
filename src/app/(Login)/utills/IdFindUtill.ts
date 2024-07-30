import { firestore } from "@/firebase/firebaseDB";
import { collection, query, where, getDoc, getDocs, doc, Timestamp } from "firebase/firestore";

const timestampToDate = (timestamp: Timestamp): Date => {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const checkEmail = async (name: string, phone: string) => {
  try {
    const usersCollectionRef = collection(firestore, "users");
    const q = query(usersCollectionRef, where("name", "==", name), where("phone", "==", phone));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDocSnapshot = querySnapshot.docs[0];
      const userDocRef = doc(firestore, "users", userDocSnapshot.id);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const formattime = formatDate(timestampToDate(userData.createTime as Timestamp));
        const userIdData: { userId: string; createTime: string; logintype: string } = {
          userId: userData.userId,
          createTime: formattime,
          logintype: userData.logintype,
        };

        return userIdData.userId && userIdData.createTime ? userIdData : null;
      }
    }
  } catch (error) {
    return false;
  }
};
