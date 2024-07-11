import {
  doc,
  updateDoc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { firestore } from "@/firebase/firebaseDB";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

interface UserInfoUpdate {
  email: string;
  id?: string;
  pw?: string;
  currentPw?: string;
  phone?: string;
  birth?: string;
}

export const updateUserInfo = async ({
  email,
  id,
  pw,
  currentPw,
  phone,
  birth,
}: UserInfoUpdate) => {
  const userRef = collection(firestore, "users");
  const q = query(userRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }

  const userDocRef = querySnapshot.docs[0].ref;

  const updates: any = {};
  if (id) updates.userId = id;
  if (phone) updates.phone = phone;
  if (birth) updates.birth = birth;

  try {
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      await updateDoc(userDocRef, updates);
    } else {
      await setDoc(userDocRef, { email, ...updates });
    }

    // 비밀번호 변경 처리
    if (pw && currentPw) {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser && email) {
        const credential = EmailAuthProvider.credential(email, currentPw);
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, pw);
      }
    }

    return { success: true, updates };
  } catch (error) {
    console.error("Error updating user info: ", error);
    return { success: false, error };
  }
};
