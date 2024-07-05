"use server";

type TAuth = {
  username: string;
  password: string;
};

export default async function Llmtest() {
  const chunk = "";
  // Authentication
  const authUrl = "http://43.203.238.76:8000/auth/token";
  const authBody: TAuth = {
    username: process.env.NEXT_PUBLIC_AUTH_USERNAME || "",
    password: process.env.NEXT_PUBLIC_AUTH_PASSWORD || "",
  };

  try {
    const authResponse = await fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(authBody).toString(),
    });

    if (!authResponse.ok) {
      const errorBody = await authResponse.json();
      console.error("Error details:", errorBody);
      throw new Error(`HTTP error! status: ${authResponse.status}`);
    }

    const authData = await authResponse.json();
    const token = authData.access_token;

    // Generate request
    const url = "http://43.203.238.76:8000/generate";
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const generateBody = {
      user_message:
        "너는 전문 애널리스트야 그러니까 애플 주식 분석을 주식 보고서 처럼 분석해주고 4줄이상 넘어가지말고 요약해서 무조건 한국어로 표현해줘",
      temperature: 0.5,
      top_p: 0.5,
    };

    const generateResponse = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(generateBody),
    });

    if (!generateResponse.ok) {
      console.error("Request failed:", await generateResponse.text());
      return;
    }

    const reader = generateResponse.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("Stream complete");
          break;
        }
        const chunk = decoder.decode(value, { stream: true });
        console.log("Received chunk:", chunk);
        return chunk;
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

  return chunk;
}
