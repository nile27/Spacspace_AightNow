// "use client";

// import { useEffect, useState } from "react";

// type TAuth = {
//   username: string;
//   password: string;
// };

// export default function Llmtest() {
//   const [response, setResponse] = useState("");

//   async function fetchData() {
//     // Authentication
//     const authUrl = "http://43.203.238.76:8000/auth/token";
//     const authBody: TAuth = {
//       username: process.env.NEXT_PUBLIC_AUTH_USERNAME || "",
//       password: process.env.NEXT_PUBLIC_AUTH_PASSWORD || "",
//     };

//     try {
//       const authResponse = await fetch(authUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams(authBody),
//       });

//       console.log("Auth response:", authResponse);
//       console.log("Auth response status:", authResponse.status);
//       const responseData = await authResponse.json();

//       const token = responseData.access_token;

//       console.log("Token:", token);

//       // Generate request
//       const url = "http://43.203.238.76:8000/generate";
//       console.log("Token:", token);
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       };
//       const generateBody = {
//         user_message: "AAPL 주식 분석해줘",
//         temperature: 0.5,
//         top_p: 0.5,
//       };

//       const generateResponse = await fetch(url, {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(generateBody),
//       });

//       console.log("Generate response:", generateResponse);

//       if (!generateResponse.ok) {
//         console.error("Request failed:", await generateResponse.text());
//         return;
//       }

//       const reader = generateResponse.body?.getReader();
//       const decoder = new TextDecoder("utf-8");

//       if (reader) {
//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) {
//             console.log("Stream complete");
//             break;
//           }
//           const chunk = decoder.decode(value, { stream: true });
//           console.log("Received chunk:", chunk);
//           setResponse(prevResponse => prevResponse + chunk);
//         }
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return (
//     <div>
//       <h1>Stock Analyst Response</h1>
//       <pre>{response}</pre>
//     </div>
//   );
// }
