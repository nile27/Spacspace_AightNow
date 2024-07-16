"use client";
import CheckBtn from "./components/CheckBtn";
import TextButton from "@/components/btnUi/TextButton";
import Link from "next/link";
import { useState } from "react";

export default function Agree() {
  const [disabled, setDisabled] = useState(Array.from({ length: 3 }, () => false));
  const handleDisabled = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let copy = [];
    if (idx === 0) copy = Array.from({ length: 3 }, () => !disabled[0]);
    else {
      copy = [...disabled];
      copy[idx] = !copy[idx];
    }
    if (copy[1] && copy[2]) copy[0] = true;
    else copy[0] = false;

    setDisabled(copy);
  };

  return (
    <>
      <h1 className="mb-5 text-h3 font-bold">약관동의</h1>

      <div className=" pb-3  border-b-[2px] w-full h-auto flex justify-between items-start">
        <span>이용약관, 개인정보 처리방침에 모두 동의합니다.</span>
        <CheckBtn onChange={handleDisabled(0)} checked={disabled[0]} />
      </div>

      <div className="w-full pt-4">
        <span className="mb-4 block">서비스 이용약관(필수)</span>
        <div className=" p-4 w-full rounded-xl h-[200px] overflow-y-scroll border border-scaleGray-300">
          <span className="mb-5 block">아잇나우 서비스 이용약관</span>
          <h2 className="mb-5">
            본 약관은 (주)스팩스페이스(이하 &quot;회사&quot;라 함)와 이용자 간의 서비스 이용에 관한
            규정을 명시합니다. 서비스를 이용함으로써 이 약관에 동의한 것으로 간주됩니다. 본 약관은
            회사의 서비스 제공과 관련하여 이용자와 회사 간의 권리, 의무 및 책임사항을 규정하고
            있습니다.
          </h2>

          <h2 className="mb-5">제1조 목적</h2>
          <p className="mb-5">
            본 약관은 (주)스팩스페이스가 제공하는 AI 애널리스트 플랫폼 스팩애널리스트 서비스(이하
            &quot;서비스&quot;라 함)를 이용함에 있어 이용자와 회사 간의 권리, 의무 및 책임사항을
            규정하는 것을 목적으로 합니다.
          </p>

          <h2 className="mb-5">제2조 용어의 정의</h2>
          <p>
            &quot;서비스&quot;라 함은 (주)스팩스페이스가 제공하는 AI 애널리스트 플랫폼
            스팩애널리스트 서비스를 말합니다.
          </p>
          <p>
            &quot;이용자&quot;라 함은 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 자를
            말합니다.
          </p>
          <p>
            &quot;회원&quot;이라 함은 서비스에 가입하여 회사가 제공하는 서비스를 이용하는 자를
            말합니다.
          </p>
          <p className="mb-5">
            &quot;사이트&quot;라 함은 (주)스팩스페이스가 서비스를 제공하기 위해 운영하는 웹사이트를
            말합니다.
          </p>

          <h2 className="mb-5">제3조 약관의 효력과 개정</h2>
          <p>본 약관은 이용자가 서비스를 이용함에 있어 회사와의 권리 의무 관계를 규정합니다.</p>
          <p>본 약관은 회사가 운영하는 사이트에 게시함으로써 효력을 발생합니다.</p>
          <p className="mb-5">
            회사는 필요한 경우 본 약관을 개정할 수 있으며, 약관이 변경된 경우에는 적용일자 및
            변경사항을 사이트에 게시합니다. 변경된 약관은 게시 즉시 효력을 발생합니다.
          </p>

          <h2 className="mb-5">제4조 서비스의 제공 및 이용</h2>
          <p>
            회사는 이용자에게 실시간 기업 공시 정보와 데일리 4만건의 뉴스 데이터 분석 자료를
            결합하여 제공하는 스팩AI 애널리스트 서비스를 제공합니다.
          </p>
          <p>
            서비스 이용을 위해서는 회원 가입이 필요합니다. 회원 가입 시에는 회사가 요청하는 정보를
            제공하여야 하며, 제공한 정보는 항상 정확하고 최신 상태를 유지하여야 합니다.
          </p>
          <p className="mb-5">
            회사는 이용자의 개인정보 보호를 위해 노력하며, 이에 대한 사항은 개인정보 처리방침에
            따릅니다.
          </p>

          <h2 className="mb-5">제5조 서비스의 변경 및 중단</h2>
          <p>
            회사는 서비스의 품질 향상 및 운영상의 필요에 따라 서비스의 일부 또는 전부를 수정, 변경,
            중단할 수 있습니다.
          </p>
          <p className="mb-5">
            서비스의 변경 및 중단에 대해서는 사전에 공지하며, 이로 인해 발생하는 손해에 대해서는
            회사는 책임을 지지 않습니다.
          </p>

          <h2 className="mb-5">제6조 저작권 및 지적재산권</h2>
          <p>회사가 작성한 서비스에 대한 모든 저작권과 지적재산권은 회사에 귀속됩니다.</p>
          <p className="mb-5">
            이용자는 회사의 사전 동의 없이 서비스에 게시된 정보를 가공, 판매, 복제, 배포할 수
            없습니다.
          </p>

          <h2 className="mb-5">제7조 면책조항</h2>
          <p>
            이용자는 서비스를 이용함에 있어 발생한 일체의 손해에 대해 회사는 책임을 지지 않습니다.
          </p>
          <p className="mb-5">
            회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적인 사유로 인해 서비스를
            제공할 수 없는 경우에는 서비스 제공에 대한 책임을 면합니다.
          </p>

          <h2 className="mb-5">제8조 분쟁의 해결</h2>
          <p className="mb-5">
            본 약관에 정하지 않은 사항이 발생할 경우 관련 법령과 회사의 내부규정에 따라 해결됩니다.
          </p>

          <p className="mb-5">부칙</p>

          <p className="mb-5">본 약관은 2024년 07월 08일부터 시행됩니다.</p>
          <p>
            이용자 여러분께서는 본 약관을 주의 깊게 읽고 서비스를 이용하기 바랍니다. 서비스 이용 시
            본 약관에 동의한 것으로 간주됩니다. 앞으로도 더 나은 서비스를 제공하기 위해 최선을
            다하겠습니다.
          </p>
        </div>
        <div className="mt-1 w-full flex justify-end items-start gap-1">
          <span>동의합니다.</span>
          <CheckBtn onChange={handleDisabled(1)} checked={disabled[1]} />
        </div>
      </div>

      <div className="w-full pt-4 mb-6">
        <span className="mb-4 block">개인정보 처리방침(필수)</span>
        <div className=" p-4 w-full rounded-xl h-[200px] overflow-y-scroll border border-scaleGray-300">
          <span className="mb-5 block">개인정보 처리방침</span>
          <p className="mb-5">
            (주)스팩스페이스는 이용자의 개인정보를 중요하게 생각하며, 정보통신망 이용촉진 및
            정보보호 등에 관한 법률을 준수하고 있습니다. 본 개인정보 처리방침은 회사가 이용자의
            개인정보를 어떻게 수집, 이용, 보호하고 있는지에 대한 내용을 설명합니다.
          </p>
          <p>수집하는 개인정보의 항목 및 수집 방법</p>
          <p>수집하는 개인정보의 항목</p>
          <ul>
            <li>이용자의 식별 정보(이름, 이메일 주소 등)</li>
            <li>서비스 이용과정에서 생성되는 정보(로그 데이터, 쿠키, 세션 정보 등)</li>
          </ul>
          <p>개인정보 수집 방법</p>
          <ul>
            <li>이용자가 회원 가입 및 서비스 이용 시 자발적으로 제공하는 경우</li>
            <li>서비스 이용 과정에서 자동으로 수집되는 경우(쿠키 등)</li>
          </ul>
          <p>개인정보의 수집 및 이용 목적</p>
          <ul>
            <li>서비스 제공 및 운영</li>
            <li>회원 관리 및 서비스 제공에 따른 본인 식별, 인증, 연령 확인</li>
            <li>서비스 개선 및 신규 서비스 개발</li>
            <li>이용자에게 적합한 맞춤형 서비스 제공</li>
          </ul>
          <p>개인정보의 보유 및 이용 기간</p>
          <p>
            회사는 이용자의 개인정보를 수집 및 이용하는 목적이 달성된 후에는 해당 정보를 지체 없이
            파기합니다. 단, 관련 법령에 의해 보존하여야 하는 경우 해당 법령에 따라 보관할 수
            있습니다.
          </p>
          <p>개인정보의 제공 및 위탁</p>
          <p>
            회사는 이용자의 개인정보를 제3자에게 제공하거나 위탁하지 않습니다. 다만, 이용자의 동의가
            있거나 법령에 의해 요구되는 경우에 한하여 예외적으로 제공될 수 있습니다.
          </p>
          <p>개인정보의 파기</p>
          <p>
            개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기의
            방법, 기한은 관련 법령에 따라 진행됩니다.
          </p>
          <p>개인정보의 안전성 확보 조치</p>
          <ul>
            <li>개인정보 처리 시스템의 암호화</li>
            <li>해킹 등에 대비한 각종 보안 시스템의 설치 및 운영</li>
            <li>개인정보 처리 직원의 교육 및 감시</li>
          </ul>
          <p>이용자의 권리와 의무</p>
          <p>
            이용자는 개인정보에 대한 열람, 정정, 삭제, 처리정지 등의 권리를 보유하고 있습니다. 이와
            관련한 요청은 회사의 고객센터를 통해 제출할 수 있습니다.
          </p>
          <p>개인정보 보호책임자</p>
          <ul>
            <li>성명: 염민호</li>
            <li>담당부서: 대표이사</li>
            <li>이메일: admin@ymsco.site</li>
          </ul>
          <p className="mb-5">부칙</p>
          <p className="mb-5">본 개인정보 처리방침은 2024년 07월 08일부터 시행됩니다.</p>
          <p className="mb-2">
            회사는 개인정보 처리방침을 개정하는 경우, 개정된 사항을 공지사항을 통하여 이용자에게
            공지할 것입니다.
          </p>
        </div>
        <div className="mt-1 items-start w-full flex justify-end gap-1">
          <span className="">동의합니다.</span>
          <CheckBtn onChange={handleDisabled(2)} checked={disabled[2]} />
        </div>
      </div>
      {disabled[0] ? (
        <Link href={"/auth"}>
          <TextButton>다음 </TextButton>
        </Link>
      ) : (
        <TextButton color="disable">다음 </TextButton>
      )}
    </>
  );
}
