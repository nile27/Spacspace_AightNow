import { auth } from "@/firebase/firebaseDB";

import { sendSignInLinkToEmail } from "firebase/auth";

const sendVerificationEmail = async (email: string, name: string): Promise<void> => {
  const actionCodeSettings = {
    url: `http://localhost:3000/redirect?mode=signIn&email=${encodeURIComponent(
      email,
    )}&name=${encodeURIComponent(name)}`,
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  } catch (error) {
    console.error("Error sending verification email:", (error as Error).message);
    throw error;
  }
};

export { sendVerificationEmail };
