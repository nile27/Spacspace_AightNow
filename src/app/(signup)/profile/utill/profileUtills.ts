import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { firestore, storage, auth } from "@/firebase/firebaseDB";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { TmemberText } from "@/Store/store";

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
    const q = query(usersRef, where("nickName", "==", nickname));
    const querySnapshot = await getDocs(q);

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
  e: React.ChangeEvent<HTMLInputElement>,
  setImgFile: React.Dispatch<React.SetStateAction<File | null>>,
  setLabelImg: React.Dispatch<React.SetStateAction<string | null>>,
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

export const handleSignUp = async (inputText: TmemberText, imgFile: File | null) => {
  try {
    const { id, pw, nickname, phone, birth, stock, email, name } = inputText;

    if (!email) {
      console.log(email);
      throw new Error("Email not found");
    }

    const authResult = await createUserWithEmailAndPassword(auth, email, pw);
    const user = authResult.user;

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
      createTime: Timestamp.now(),
      logintype: "none",
    });

    // 회원가입 성공 후 리다이렉션 또는 다른 작업 수행
  } catch (error) {
    console.error("Error signing up:", error);
    // 에러 처리 로직 추가
  }
};
