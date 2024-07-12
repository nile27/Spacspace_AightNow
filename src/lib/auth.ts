import { NextAuthOptions, User, DefaultSession } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import { signInWithCustomToken } from "firebase/auth";
import { JWT } from "next-auth/jwt";
import { auth, db } from "@/firebase/firebaseAdmin";
import { app, firestore } from "@/firebase/firebaseDB";
import { Timestamp } from "firebase-admin/firestore";
import { collection, query, getDocs, where } from "firebase/firestore";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    birth?: string;
    nickname?: string;
    profile_image?: string;
    firebaseToken?: string;
    phone?: string;
    createTime?: Timestamp;
    stock?: string[];
    logintype?: string;
    isNewUser?: boolean;
  }
}
declare module "next-auth" {
  interface User {
    id: string;
    name?: string;
    email?: string;
    birth?: string;
    nickname?: string;
    logintype?: string;
    profile_image?: string;
  }
  interface Session {
    isNewUser?: boolean;
    user: {
      id?: string;
      name?: string;
      email?: string;
      birth?: string;
      nickname?: string;
      profile_image?: string;
      firebaseToken?: string;
      phone?: string;
      createTime?: Timestamp;
      stock?: string[];
      logintype?: string;
    } & DefaultSession["user"];
  }
}

export const authConfig: NextAuthOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
      profile(profile) {
        // console.log("Naver profile data:", profile);
        return {
          id: profile.response.id,
          name: profile.response.name,
          email: profile.response.email,
          birth: profile.response.birthyear + profile.response.birthday,
          profile_image: profile.response.profile_image,
          logintype: "naver",
        };
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_REST_API as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,

      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.kakao_account.profile.nickname,
          email: profile.kakao_account.email,
          birth: "",
          profile_image: profile.kakao_account.profile.profile_image_url,
          logintype: "kakao",
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user }: { user: User }) {
      if (user && user.email) {
        const usersCollectionRef = collection(firestore, "users");
        const q = query(usersCollectionRef, where("email", "==", user?.email));

        const userDocSnap = await getDocs(q);
        console.log("user:", userDocSnap.docs[0].data());

        if (userDocSnap.empty) {
          const redirectPath = `/signup?type=${encodeURIComponent(
            user.logintype || "",
          )}&name=${encodeURIComponent(user.name || "")}&email=${encodeURIComponent(
            user.email || "",
          )}&profile_image=${encodeURIComponent(user.profile_image || "")}`;
          return redirectPath;
        } else {
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = "";
        token.name = user.name;
        token.email = user.email;
        token.birth = user.birth;
        token.phone = "";
        token.nickname = "";
        token.stock = [];
        token.logintype = user.logintype;
        token.profile_image = user.profile_image;
        token.isNewUser = false;

        const firebaseToken = await auth.createCustomToken(user.id, {
          name: user.name,
          email: user.email,
          birth: user.birth,
          profile_image: user.profile_image,
        });

        token.firebaseToken = firebaseToken;

        try {
          const existUser = await auth.getUserByEmail(user.email as string);
          console.log("exust", existUser);
          if (existUser) {
            const userSnapshot = await db.collection("users").doc(existUser.uid).get();
            const userData = userSnapshot.data();
            console.log(userData);
            if (userData) {
              token.id = userData.userId;
              token.name = userData.name;
              token.email = userData.email;
              token.birth = userData.birth;
              token.phone = userData.phone;
              token.createTime = userData.createTime;
              token.nickname = userData.nickname;
              token.stock = userData.stock;
              token.logintype = userData.logintype;
              token.profile_image = existUser.photoURL;
              token.isNewUser = false;
              console.log("sss");
              return token;
            }
          }
        } catch (error: any) {
          token.isNewUser = true;
        }
      }

      return token;
    },

    async session({ session, token }) {
      console.log("session", token.email);
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        birth: token.birth,
        firebaseToken: token.firebaseToken,
        profile_image: token.profile_image,
        phone: token.phone,
        createTime: token.createTime,
        nickname: token.nickname,
        stock: token.stock,
        logintype: token.logintype,
      };

      session.isNewUser = token.isNewUser ? true : false;

      return session;
    },
  },
};
