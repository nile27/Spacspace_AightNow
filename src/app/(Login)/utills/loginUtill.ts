import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { firestore, auth } from "@/firebase/firebaseDB";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthStore, TUserData } from "@/Store/store";

export function loginRegExp(id: string, pw: string) {
  // id 정규식: 알파벳과 숫자 조합, 최소 5자 이상
  const idRegex = /^[a-zA-Z0-9]{5,}$/;

  // pw 정규식: 알파벳, 숫자, 특수문자 조합, 최소 8자 이상
  const pwRegex =
    /^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$|^(?=.*\d)(?=.*[A-Za-z]|.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$|^(?=.*[!@#$%^&*])(?=.*[A-Za-z]|.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/;

  // id와 pw가 각각 해당 조건을 만족하는지 검사
  const isIdValid = idRegex.test(id);
  const isPwValid = pwRegex.test(pw);

  if (isIdValid && isPwValid) return { bool: true };
  else return { bool: false };
}

const getUserEmailByUserId = async (userId: string) => {
  try {
    const usersCollectionRef = collection(firestore, "users");
    const q = query(usersCollectionRef, where("userId", "==", userId));
    const userDocSnap = await getDocs(q);

    if (!userDocSnap.empty) {
      const userDoc = userDocSnap.docs[0];

      return userDoc.data().email;
    } else {
      console.log("사용자 문서가 존재하지 않습니다.");
      return null;
    }
  } catch (error) {
    console.error("Firestore에서 사용자 정보를 가져오는 중 오류 발생:", error);
    throw error;
  }
};

export const handleLogin = async (email: string, pw: string): Promise<boolean> => {
  try {
    const userEmail = await getUserEmailByUserId(email);
    console.log(userEmail);
    const userCredential = await signInWithEmailAndPassword(auth, userEmail, pw);
    const user = userCredential.user;
    const userRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists() && user) {
      const userData = userDoc.data();
      useAuthStore.getState().setUser(userData as TUserData);

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // 에러를 호출자에게 전달
  }
};
