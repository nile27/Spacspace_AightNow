import * as admin from "firebase-admin";

const base64EncodedKey = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;
const serviceAccount = JSON.parse(
  Buffer.from(base64EncodedKey as string, "base64").toString("utf8"),
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
}

const adminAuth = admin.auth();
const db = admin.firestore();
export { adminAuth, db };
