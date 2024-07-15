import { useAuthStore } from "@/Store/store";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebaseDB";

const updateLanguage = async (language: string) => {
  const authStore = useAuthStore.getState();
  const email = authStore.user?.email;
  if (!email) {
    throw new Error("조회할 데이터 email이 없습니다.");
  }

  const userRef = collection(firestore, "users");
  const q = query(userRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("No matching documents.");
  }
  const userDoc = querySnapshot.docs[0].ref;
  await updateDoc(userDoc, {
    language: language,
  });

  if (authStore.user) {
    authStore.setUser({
      ...authStore.user,
      language: language,
    });
  }
};

export { updateLanguage };
