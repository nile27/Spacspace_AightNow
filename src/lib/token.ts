export async function token() {
  const res = await fetch("http://43.203.238.76:8000/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: process.env.NEXT_PUBLIC_AUTH_USERNAME || "",
      password: process.env.NEXT_PUBLIC_AUTH_PASSWORD || "",
    }).toString(),
  });

  const authData = await res.json();

  return authData.access_token;
}

export async function generate(token: string) {
  const url = "http://43.203.238.76:8000/generate";
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/json",
  };
  const body = {
    user_message: "애플 주식에 대해 분석해줘",
    temperature: 0.5,
    top_p: 0.5,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Error response:", response.status, errorBody);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      const textData = await response.text();
      return { text: textData };
    }
  } catch (error) {
    console.error("Error in generate function:", error);
    throw error;
  }
}
