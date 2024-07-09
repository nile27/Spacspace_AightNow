import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: Request, { params }: { params: { oid: string; aid: string } }) {
  // rank/route.ts에서  officeId(oid), articleId(aid)
  const { oid, aid } = params;
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(`https://n.news.naver.com/mnews/article/${oid}/${aid}`, {
      waitUntil: "networkidle2",
    });

    const article = await page.$eval("#newsct", element => {
      const selectElement = (selector: string) => element.querySelector(selector) as HTMLElement;
      const titleElement = selectElement(".media_end_head_title");
      const providerElement = selectElement(".media_end_head_top_logo_img").getAttribute("alt");
      const timeElement = selectElement(".media_end_head_info_datestamp_time._ARTICLE_DATE_TIME");
      const contentElement = selectElement("#dic_area");

      if (contentElement) {
        const end_photo = contentElement.querySelector("#img_a2");
        if (end_photo) {
          end_photo.remove();
        }
      }

      if (!titleElement || !timeElement || !contentElement) {
        throw new Error("Required elements not found");
      }

      return {
        title: titleElement.innerText,
        provider: providerElement,
        time: timeElement.innerText,
        body: contentElement.innerHTML,
      };
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error(`Error processing ${oid} ${aid}:`, error);
    return NextResponse.error();
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}