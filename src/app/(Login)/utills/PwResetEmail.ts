import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebaseDB";
import { sendPasswordResetEmail } from "firebase/auth";

const verifyUserDetails = async (email: string, name: string, id: string) => {
  const usersRef = collection(firestore, "users");
  const q = query(
    usersRef,
    where("email", "==", email),
    where("name", "==", name),
    where("userId", "==", id),
  );

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return true;
  } else {
    return false;
  }
};

const pwResetEmail = async (email: string, name: string, id: string): Promise<void> => {
  const actionCodeSettings = {
    url: "http://localhost:3000/redirect?mode=resetPassword",
    handleCodeInApp: true,
  };

  try {
    const isValue = await verifyUserDetails(email, name, id);
    if (isValue) {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
    } else {
      throw new Error("Invalid user details");
    }
  } catch (error) {
    console.error("Error sending password reset email:", (error as Error).message);
    throw error;
  }
};

export { pwResetEmail };
