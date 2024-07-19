import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { firestore, storage, auth } from "@/firebase/firebaseDB";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { TmemberText } from "@/Store/store";
import { ChangeEvent } from "react";

export const handleNickNameCheck = async (
  nickname: string,
  setNickNameErr: React.Dispatch<React.SetStateAction<boolean>>,
  setNickNameCheck: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (!nickname) {
    setNickNameErr(true);
    return;
  }

  try {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("nickname", "==", nickname));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.empty);
    if (!querySnapshot.empty) {
      setNickNameErr(false);
      setNickNameCheck(true);
    } else {
      setNickNameErr(true);
      setNickNameCheck(true);
    }
  } catch (error) {
    console.error("Error checking nickname: ", error);
    alert("닉네임 확인 중 오류가 발생했습니다.");
  }
};

export const saveImgFile = (
  e: ChangeEvent<HTMLInputElement>,
  setImgFile: (imgFile: File | null) => void,
  setLabelImg: (labelImg: string | null) => void,
) => {
  const files = e.target.files;
  if (!files || files.length === 0) {
    return;
  }
  const file = files[0];
  setImgFile(file);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setLabelImg(reader.result as string);
  };
};

export const handleSignUp = async (
  inputText: TmemberText,
  imgFile: File | null,
  labelImg: string | null,
) => {
  const { id, pw, nickname, phone, birth, stock, email, name, logintype } = inputText;

  try {
    if (!email) {
      throw new Error("Email not found");
    }
    if (logintype === "none") {
      const authResult = await createUserWithEmailAndPassword(auth, email, pw);
      const user = authResult.user;
      console.log("일반");
      let photoURL = "";
      if (imgFile) {
        const storageRef = ref(storage, `profile_images/${user.uid}/${imgFile.name}`);
        await uploadBytes(storageRef, imgFile);
        photoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(user, {
        displayName: nickname,
        photoURL: photoURL,
      });

      const userRef = doc(firestore, "users", user.uid);
      await setDoc(userRef, {
        userId: id,
        nickname: nickname,
        stock: stock,
        name: name,
        email: email,
        phone: phone,
        birth: birth,
        profile_image: photoURL,
        language: "KO",
        createTime: Timestamp.now(),
        logintype: "none",
      });
    } else if (logintype === "google") {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated");
      }
      let photoURL = labelImg;
      if (imgFile) {
        const storageRef = ref(storage, `profile_images/${user.uid}/${imgFile.name}`);
        await uploadBytes(storageRef, imgFile);
        photoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(user, {
        displayName: nickname,
        photoURL: photoURL,
      });

      const userRef = doc(firestore, "users", user.uid);
      await setDoc(userRef, {
        userId: id,
        nickname: nickname,
        stock: stock,
        name: name,
        email: email,
        phone: phone,
        birth: birth,
        language: "KO",
        createTime: Timestamp.now(),
        logintype: logintype,
      });
    } else {
      const authResult = await createUserWithEmailAndPassword(auth, email, pw);
      const user = authResult.user;

      if (!user) {
        throw new Error("User not authenticated");
      }
      let photoURL = labelImg;
      if (imgFile) {
        const storageRef = ref(storage, `profile_images/${user.uid}/${imgFile.name}`);
        await uploadBytes(storageRef, imgFile);
        photoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(user, {
        displayName: nickname,
        photoURL: photoURL,
      });

      const userRef = doc(firestore, "users", user.uid);
      await setDoc(userRef, {
        userId: id,
        nickname: nickname,
        stock: stock,
        name: name,
        email: email,
        phone: phone,
        birth: birth,
        language: "KO",
        profile_image: photoURL,
        createTime: Timestamp.now(),
        logintype: logintype,
      });
    }

    // 회원가입 성공 후 리다이렉션 또는 다른 작업 수행
  } catch (error) {
    console.error("Error signing up:", error);
    // 에러 처리 로직 추가
  }
};
