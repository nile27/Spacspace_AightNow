"use client";

import Icon from "@/components/Stock/Icon";
import { useState } from "react";

export default function Analysis() {
  const [response, setResponse] = useState("");

  const handleGenerate = async () => {
    const generateBody = {
      user_message:
        "As a stock analyst, you are an agent who givesstock-related information on behalf of customers when they wantto obtain information such as stock-related information, currentstatus, or statistics. If there are any stock-related termsto answer a question, you should put the term description below the question. If you are not sure about the term, you can ask the user to provide more information \n\nquestion: 너가 생각하기에 apple의 재무재표 분석하고, 투자하기 좋아보이는지 판단하고 상, 중, 하 중에 하나로 한글로 대답해줘. ",
      temperature: 0.9,
      top_p: 0.9,
    };

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generateBody),
      });

      if (!res.ok) throw new Error(res.statusText);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setResponse(prev => prev + chunk);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="w-[750px] h-[295px] p-8 bg-white font-['Pretendard'] rounded-2xl">
        <h2 className="font-bold">아잇나우 AI 애널리스트 리포트</h2>
        <div className="w-[323px] h-8  flex gap-2 mt-5 item-center">
          <Icon name="apple" size={32} />
          <div className=" flex justify-between items-center gap-1 font-medium ">
            <span>애플</span>
            <span>∙</span>
            <span>$00.00</span>
            <span className="text-rose-500">▲+1.75</span>
            <span className="text-rose-500">+0.82%</span>
          </div>
        </div>
        <div className="w-[686px] h-24 mt-4 inline-flex justify-start items-start gap-2.5 ">
          <div className="grow shrink basis-0 text-black text-base font-medium leading-normal">
            급격한 금리 인상에도 견조한 자동차 수요를 반영하여 테슬라의 목표주가를 340달러로 26%
            상향 조정하고 Top Pick으로 유지한다. 단기 상승에 따른 숨 고르기가 예상되지만, 중기적으로
            동사의 경쟁우위는 더 강해지고 있다. 기존 OEM의 전기차 전환이 더디고 중국 신생 업체들의
            현금 흐름이 약화되고있는 가운데, 테슬라의 멕시코 공장이 가동되면 전기차 제조 경쟁력
            격차는 더 벌어질 것으로 예상된다.
          </div>
        </div>

        <button onClick={handleGenerate}>Generate Response</button>
        <pre>{response}</pre>
      </div>
    </>
  );
}
