export const llmAction = async () => {
  const authResponse = await fetch("http://43.203.238.76:8000/auth/token", {
    method: "POST",
    body: JSON.stringify({
      username: "sfacspace_3",
      password: "tC2FVblR81cs",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const AuthResult = await authResponse.json();
  const token = AuthResult.access_token;
  const promptResponse = await fetch("http://43.203.238.76:8000/generate", {
    method: "POST",
    body: JSON.stringify({
      user_message:
        "As a stock analyst, you are an agent who givesstock-related information on behalf of customers when they wantto obtain information such as stock-related information, currentstatus, or statistics. If there are any stock-related termsto answer a question, you should put the term description below the question. If you are not sure about the term, you can ask the user to provide more information \n\nquestion: 너가 생각하기에 apple의 재무재표 분석하고, 투자하기 좋아보이는지 판단하고 상, 중, 하 중에 하나로 한글로 대답해줘. ",
      temperature: 0.5,
      top_p: 0.5,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const promptResult = await promptResponse.json();
  console.log(promptResult);
};
