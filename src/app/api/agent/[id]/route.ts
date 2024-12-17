import { agentChatTogether } from "@/lib/agentTogetherAI";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge'; // Edge Runtime 사용
export const maxDuration = 600; // 최대 실행 시간 10분

export async function GET(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "종목 코드가 유효하지 않습니다." }, { status: 400 });
  }

  try {
    const result = await agentChatTogether(id);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in agent chat:", error);
    const errorMessage = error instanceof Error ? error.message : "서버 내부 오류가 발생했습니다.";
    
    if (error instanceof Error && error.message.includes("시간이 초과")) {
      return NextResponse.json({ error: errorMessage }, { status: 504 });
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: error instanceof Error && error.message.includes("Invalid stock") ? 400 : 500 }
    );
  }
}
