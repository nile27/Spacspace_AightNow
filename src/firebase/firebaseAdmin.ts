import admin from "firebase-admin";
import { initializeApp } from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
      projectId: "test-29402",
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  });
}

const auth = admin.auth();
const db = admin.firestore();
export { auth, db };
