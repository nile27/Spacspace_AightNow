"use client";
import { useState } from "react";
import TextButton from "@/components/btnUi/TextButton";
import ModalContainer from "../../components/ModalContainer";

export default function MainProfile() {
  const [isModal, setModal] = useState(false);
  const [modalIdx, setIdx] = useState(0);
  return (
    <main className="w-full h-auto rounded-2xl p-[32px] min-h-[720px]  bg-white ">
      <figure className="w-full h-auto mb-10">
        <div className="w-full h-auto flex justify-between items-center">
          <div className="w-auto h-auto">
            <h2 className=" text-body2  text-mainNavy-900 font-bold mb-3">프로필 설정</h2>
            <span className="text-body4 font-light">
              서비스 사용시 보여지는 프로필을 생성 및 변경합니다. 프로필을 설정해보세요
            </span>
          </div>

          <TextButton
            onClick={() => {
              setModal(!isModal);
              setIdx(0);
            }}
            size="custom"
            width="200px"
            height="36px"
          >
            프로필 설정
          </TextButton>
        </div>
        <div className="w-full h-auto mt-8 flex ">
          <span className="mr-[125px]">프로필</span>
          <div className="flex justify-center items-center gap-[16px]">
            <div className="w-[60px] h-[60px] bg-black rounded-full"></div>
            <span>김스팩</span>
          </div>
        </div>
      </figure>
      <figure className="w-full h-auto">
        <div className="w-full h-auto flex justify-between items-center">
          <div className="w-auto h-auto">
            <h2 className=" text-body2  text-mainNavy-900 font-bold mb-3">계정 설정</h2>
            <span className="text-body4 font-light">
              서비스 이용시 사용되는 계정을 생성 및 변경합니다. 계정을 연동하여 다양한 서비스를
              이용해보세요.
            </span>
          </div>

          <TextButton
            size="custom"
            width="200px"
            height="36px"
            onClick={() => {
              setModal(!isModal);
              setIdx(1);
            }}
          >
            계정정보 수정
          </TextButton>
        </div>
        <div className="w-full h-auto mt-8 mb-5 flex ">
          <span className="mr-[120px] w-[56px]">아이디</span>
          <div className="flex justify-center items-center gap-[16px]">
            <span>21dasdwqd</span>
          </div>
        </div>
        <div className="w-full h-auto mb-5  flex ">
          <span className="mr-[120px] w-[56px]">이름</span>
          <div className="flex justify-center items-center gap-[16px]">
            <span>김스팩</span>
          </div>
        </div>
        <div className="w-full h-auto mb-5  flex ">
          <span className="mr-[120px] w-[56px]">생년월일</span>
          <div className="flex justify-center items-center gap-[16px]">
            <span>991231</span>
          </div>
        </div>
      </figure>
      {isModal && (
        <ModalContainer isModal={isModal} setIsModal={setModal} setIdx={setIdx} idx={modalIdx} />
      )}
    </main>
  );
}
