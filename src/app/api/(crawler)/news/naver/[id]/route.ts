import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params; //   api/news/naver/route 에서 aid 사용

  try {
    const url = `https://api.stock.naver.com/news/worldNews/stock/fnGuide/${id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }

    const data = await response.json();
    return NextResponse.json(data.article);
  } catch (error) {
    // console.error('Error fetching stock data:', error.message);
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
  }
}
