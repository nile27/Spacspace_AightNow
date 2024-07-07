import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = `https://m.stock.naver.com/front-api/news/category?category=ranknews&pageSize=20&page=1`;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    const list = data.result.map((item: any) => {
      return {
        subcontent: item.body,
        tumbUrl: item.imageOriginLink,
        oid: item.officeId,
        ohnm: item.officeName,
        aid: item.articleId,
        tit: item.title,
        dt: item.datetime,
        isVideo: item.isVideo,
        hasImage: item.hasImage,
      };
    });

    return NextResponse.json(list);
  } catch (error) {
    console.error(`Error fetching rank news:`, error);
    return NextResponse.json({ error: "Failed to fetch rank news data" }, { status: 500 });
  }
}
