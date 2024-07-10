// import { NextResponse } from "next/server";
// import puppeteer, { Page } from "puppeteer";
// // import { db } from "../../../firebaseAdmin";
// import { TNewsList } from "../../type";

// const BASE_URL = "https://www.investing.com";
// const stock_names = [
//   "apple-computer-inc",
//   "tesla-motors",
//   "microsoft-corp",
//   "amazon-com-inc",
//   "google-inc",
//   "unity-software-inc",
// ];

// // 뉴스 기사 내용을 가져오는 함수
// const fetchArticleContent = async (page: Page, oid: string, aid: string) => {
//   try {
//     console.log(aid);
//     await page.goto(`${BASE_URL}/news/${oid}/${aid}`, { waitUntil: "networkidle2" });
//     await page.waitForSelector(".relative.flex.flex-col", { timeout: 5000 });

//     const content = await page.$eval(".relative.flex.flex-col", element => {
//       const selectElement = (selector: string) => element.querySelector(selector) as HTMLElement;
//       // const aid = window.location.href.split("/")[5];
//       // const titleElement = selectElement("h1");
//       const imageElement = element.querySelector("img.object-contain") as HTMLImageElement;
//       const contentElement = selectElement("div.article_WYSIWYG__O0uhw");
//       const timeElement = selectElement("div.flex.flex-col > div.flex.flex-row > span");
//       // const providerElement = element.querySelector(
//       //   "div.flex.flex-row.items-end.text-xs > a > div > img",
//       // ) as HTMLImageElement;

//       const parsedDate = new Date(timeElement.innerText.replace("Published ", "").replace(",", ""));
//       const period = parsedDate.getHours() < 12 ? "오전" : "오후";
//       const formattedDate = parsedDate.toLocaleString("ko-KR", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       });

//       const published = formattedDate.replace(/AM|PM/, period);

//       if (!contentElement) {
//         return null;
//       } else {
//         const newsAds = element.querySelectorAll(
//           "div[data-test='ad-slot-visible'], div.mt-3, div[data-test='contextual-subscription-hook']",
//         );
//         newsAds.forEach(ad => ad.remove());
//       }

//       let contentHTML = contentElement.innerHTML;
//       contentHTML = contentHTML.replace(/class=/g, "className="); // class 속성을 className으로 변경

//       return {
//         // articleId: aid,
//         // title: titleElement.innerText,
//         // provider: providerElement ? providerElement.alt : null,
//         // time: timeElement.innerText.replace("Published ", "").replace(",", ""),
//         time: published,
//         body: contentHTML,
//         image: imageElement ? imageElement.src : null,
//       };
//     });

//     // if (content) {
//     //   // Firestore에 article content 저장
//     //   await db.collection("newsArticles").doc(url).set(content);
//     // }

//     return content;
//   } catch (error) {
//     console.error("Error fetching article content:", error);
//     return null;
//   }
// };

// // 주식 종목의 기사를 페이지에서 가져오는 함수
// const fetchArticlesFromPage = async (stock_name: string, page: Page, index: number) => {
//   try {
//     await page.goto(`${BASE_URL}/equities/${stock_name}-news/${index}`, {
//       // headless: true,
//       waitUntil: "networkidle2",
//     });

//     const closeModalButtonSelector = "#button2";
//     const isPopupVisible = await page.$(closeModalButtonSelector);
//     if (isPopupVisible) {
//       await page.click(closeModalButtonSelector);
//       await new Promise(page => setTimeout(page, 1000)); // 팝업 닫힌 후 약간의 대기 시간
//     }

//     await page.waitForSelector("article div");

//     const source = await page.$$eval("article div", elements =>
//       elements
//         .map(element => {
//           const selectElement = (selector: string) =>
//             element.querySelector(selector) as HTMLElement;

//           const titleElement = selectElement("a[data-test='article-title-link']");
//           const subcontentElement = selectElement("p[data-test='article-description']");
//           const providerElement = selectElement("span[data-test='news-provider-name']");
//           const timeElement = selectElement("time[data-test='article-publish-date']");

//           if (!titleElement || !providerElement || !timeElement || !subcontentElement) {
//             return null;
//           }

//           return {
//             aid: titleElement.getAttribute("href")?.split("/")[3],
//             tit: titleElement.innerText,
//             subcontent: subcontentElement.innerText.trim(),
//             oid: titleElement.getAttribute("href")?.split("/")[2],
//             ohnm: providerElement.innerText,
//             dt: timeElement.innerText,
//             thumbUrl: "",
//             isVideo: false,
//             hasImage: false,
//             published: "",
//             content: "",
//             stockName: "",
//             // published: timeElement.getAttribute("datetime") || "",
//           };
//         })
//         .filter(article => article !== null),
//     );

//     source.forEach(article => {
//       article.stockName = stock_name.split("-")[0];
//     });

//     const articles = [];
//     for (let article of source) {
//       if (article !== null) {
//         if (article.oid === undefined || article.aid === undefined) continue;
//         const content = await fetchArticleContent(page, article.oid, article.aid);
//         console.log(content);
//         if (content) {
//           article.published = content.time;
//           article.content = content.body;
//           article.thumbUrl = content.image || "";
//           article.hasImage = content.image ? true : false;
//           articles.push(article as TNewsList);
//         }
//       }
//     }

//     return articles;
//   } catch (error) {
//     console.error(`Error processing ${stock_name}:`, error);
//     return [];
//   }
// };

// // API 핸들러 함수
// export async function GET(request: Request) {
//   const browser = await puppeteer.launch({
//     headless: false, // false 일 경우 실행 시 웹사이트 확인 가능
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   });
//   const page = await browser.newPage();

//   const allArticles = [];
//   for (let stock_name of stock_names) {
//     const articles = await fetchArticlesFromPage(stock_name, page, 1);
//     allArticles.push(...(articles as TNewsList[]));
//     // console.log(articles);
//   }

//   // await browser.close(); // 브라우저 종료

//   return NextResponse.json(allArticles);
// }
