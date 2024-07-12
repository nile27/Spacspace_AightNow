"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebaseDB";
const RedirectPage: React.FC = () => {
  const router = useRouter();

  const checkEmail = async (email: string | null) => {
    try {
      const usersCollectionRef = collection(firestore, "users");
      const q = query(usersCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        router.push("/signduple");
        return;
      }
    } catch (error) {
      console.log("회원가입 진행");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get("mode");
    const oobCode = urlParams.get("oobCode");
    const continueUrl = urlParams.get("continueUrl");
    const lang = urlParams.get("lang") || "en";
    let email = urlParams.get("email");
    let name = urlParams.get("name");

    if (continueUrl) {
      const continueUrlParams = new URLSearchParams(decodeURIComponent(continueUrl.split("?")[1]));
      email = email || continueUrlParams.get("email");
      name = name || continueUrlParams.get("name");
    }

    checkEmail(email);
    if (mode && oobCode) {
      switch (mode) {
        case "resetPassword":
          router.push(`/pwchange?oobCode=${oobCode}&lang=${lang}`);
          break;
        case "signIn":
          router.push(`/signup?oobCode=${oobCode}&lang=${lang}&email=${email}&name=${name}`);
          break;
        default:
      }
    } else {
    }
  }, [router]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
