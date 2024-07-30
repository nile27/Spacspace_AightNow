import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage, auth } from "@/firebase/firebaseDB";
import { updateProfile } from "firebase/auth";

interface UserProfileUpdate {
  email: string;
  nickname?: string;
  stock?: string[];
  imageFile?: File | null;
}

export const updateUserProfile = async ({
  email,
  nickname,
  stock,
  imageFile,
}: UserProfileUpdate) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No authenticated user");
  }
  const usersCollectionRef = collection(firestore, "users");
  const q = query(usersCollectionRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  let userDocRef;

  if (!querySnapshot.empty) {
    userDocRef = querySnapshot.docs[0].ref;
  } else {
    userDocRef = doc(usersCollectionRef);
  }

  const updates: any = {};
  if (nickname) updates.nickname = nickname;
  if (stock) updates.stock = stock;

  if (imageFile) {
    const imageRef = ref(storage, `profile_images/${user.uid}/${imageFile.name}`);

    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    await updateProfile(user, { photoURL: imageUrl });
  }
  await setDoc(
    userDocRef,
    {
      email,
      ...updates,
    },
    { merge: true },
  );
};
