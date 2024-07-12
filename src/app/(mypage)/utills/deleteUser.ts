import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore, auth } from "@/firebase/firebaseDB";

interface DeleteUserProps {
  email: string;
  password: string;
}

export const deleteUserAccount = async ({ email, password }: DeleteUserProps) => {
  const user = auth.currentUser;

  if (user && user.email === email) {
    try {
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);

      const userDocRef = doc(firestore, "users", user.uid);
      await deleteDoc(userDocRef);

      return { success: true };
    } catch (error) {
      console.error("Error deleting user: ", error);
      return { success: false, error };
    }
  } else {
    return { success: false, error: "User not authenticated or email does not match." };
  }
};
