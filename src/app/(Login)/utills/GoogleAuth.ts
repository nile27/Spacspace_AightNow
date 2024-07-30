import { TUserData } from "@/Store/store";
import { auth, firestore, storage } from "@/firebase/firebaseDB";
import { signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export interface UserData {
  name: string;
  email: string;
  logintype: string;
  [key: string]: string;
}

interface LoginResponse {
  isSign: boolean;
  data: any;
  img?: string;
  imgFile?: File | string | null;
}

export const googleLogin = async (): Promise<LoginResponse | undefined> => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user) {
      const userRef = doc(firestore, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData: UserData = {
        name: user.displayName || "",
        email: user.email || "",
        logintype: "google",
      };
      const userProfile = userSnap.data();

      if (!userSnap.exists()) {
        const imgFile = user.photoURL;

        return { isSign: false, data: userData, img: user.photoURL || "", imgFile: imgFile };
      } else {
        const profileImage = userProfile?.profile_image;

        await updateProfile(user, {
          photoURL: profileImage,
        });

        return {
          isSign: true,
          data: userSnap.data() as TUserData,
          img: "",
          imgFile: user.photoURL,
        };
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};
