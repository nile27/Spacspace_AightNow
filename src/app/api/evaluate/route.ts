import { agentEvaluation } from "@/lib/Ollama";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await agentEvaluation();
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in agent chat:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
