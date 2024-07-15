"use server";
import { NextRequest, NextResponse } from "next/server";
import { adminAuth, db } from "@/firebase/firebaseAdmin";

interface ResponseData {
  success: boolean;
  error?: string;
}
export async function POST(req: NextRequest) {
  const { email } = await req.json();
  try {
    const userRecord = await adminAuth.getUserByEmail(email);
    const uid = userRecord.uid;

    await adminAuth.deleteUser(uid);
    await db.collection("users").doc(uid).delete();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
