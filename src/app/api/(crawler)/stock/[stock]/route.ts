import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { stock: string } }) {
  const { stock } = params;
  // Check if stock symbol exists and is a string
  if (!stock || typeof stock !== "string") {
    return NextResponse.json(
      { error: "Symbol is required and should be a string" },
      { status: 400 },
    );
  }

  try {
    const url = `https://api.stock.naver.com/stock/${stock}/basic`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // console.error('Error fetching stock data:', error.message);
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
  }
}
