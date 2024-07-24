import { agentEvaluationTogether } from "@/lib/agentTogetherAI";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const result = await agentEvaluationTogether(id);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in agent evaluation:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
