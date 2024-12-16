//ai 애널리스트 분석

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, retries = 5, initialDelay = 2000) {
  let lastError;
  let delay = initialDelay;

  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 180000); // 3분 타임아웃

      try {
        console.log(`Attempt ${i + 1}/${retries}: Fetching data...`);
        const res = await fetch(url, {
          signal: controller.signal,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });
        clearTimeout(timeoutId);

        // 504 에러의 경우 재시도
        if (res.status === 504) {
          console.log("Received 504 timeout, retrying...");
          throw new Error("Temporary timeout");
        }

        return res;
      } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Request aborted due to timeout, retrying...");
          throw new Error("Request timeout");
        }
        throw error;
      }
    } catch (error) {
      lastError = error;
      if (i < retries - 1) {
        console.log(`Waiting ${delay}ms before retry...`);
        await wait(delay);
        delay *= 1.5; // 더 완만한 백오프
        console.log(`Retrying request (${i + 1}/${retries})...`);
      }
    }
  }

  throw new Error("모든 재시도 시도가 실패했습니다. 잠시 후 다시 시도해주세요.");
}

export async function stockAnalysis(id: string) {
  try {
    if (!process.env.NEXTAUTH_URL) {
      throw new Error("NEXTAUTH_URL이 설정되지 않았습니다.");
    }

    const res = await fetchWithRetry(`${process.env.NEXTAUTH_URL}/api/agent/${id}`);

    if (!res.ok) {
      if (res.status === 400) {
        throw new Error("유효하지 않은 종목 코드입니다.");
      } else if (res.status === 504) {
        throw new Error("서버 응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.");
      }
      throw new Error(`API 요청 실패: ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("잘못된 응답 형식: JSON이 예상됨");
    }

    const text = await res.text();
    if (!text) {
      throw new Error("빈 응답이 반환되었습니다.");
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("JSON 파싱 에러:", e);
      throw new Error("응답 데이터 파싱에 실패했습니다.");
    }
  } catch (error) {
    console.error("Stock Analysis Error:", error);
    throw error;
  }
}
