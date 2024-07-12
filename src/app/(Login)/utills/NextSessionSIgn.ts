import { Session } from "next-auth";
import { auth } from "@/firebase/firebaseDB";

export const signUpToFirebase = async (session: Session) => {
  if (!session.user.email) {
    console.error("Email is undefined");
    return;
  }
  console.log(session);
  try {
  } catch (error) {}
  // if (session?.user?.firebaseToken) {
  //   console.log("Firebase token found, attempting to sign in...");
  //   try {
  //     const userCredential = await signInWithCustomToken(auth, session.user.firebaseToken);
  //     console.log("Firebase login successful:", userCredential);
  //     setData(userCredential);
  //   } catch (error) {
  //     console.error("Firebase login error:", error);
  //   }
  // }
};
