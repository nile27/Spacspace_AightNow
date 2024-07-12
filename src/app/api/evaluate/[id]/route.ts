import { agentEvaluation } from "@/lib/Ollama";
import { agentEvaluationApi } from "@/lib/OllamaTest";
import { agentEvaluationTogether } from "@/lib/TogetherTest";

import { NextResponse } from "next/server";

export async function GET(res: NextResponse) {
  const id = res.url.slice(32, undefined);
  try {
    const result = await agentEvaluationTogether(id);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in agent chat:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
