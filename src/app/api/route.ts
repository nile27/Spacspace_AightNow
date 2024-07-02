import { useEffect, useState } from "react";

type TAuth = {
  username: string;
  password: string;
};

export default function Llmtest() {
  async function fetchData() {
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
          "As a stock analyst, you are an agent who gives stock-related information on behalf of customers when they want to obtain information such as stock-related information, current status, or statistics. If there are any stock-related terms to answer a question, you should put the term description below the answ \n\nquestion: , ,, .",
        temperature: 0.9,
        top_p: 0.9,
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

      // 변경된 부분: Response.text() 사용
      const responseText = await generateResponse.text();
      console.log(responseText);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  fetchData();
}
