"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalMain from "../mypage/components/ModalMain";
import ProfileModal from "@/app/(mypage)/mypage/components/ProfileModal";
import BasicIcon from "@/components/Icon/BasicIcons";
import AuthModal from "@/app/(mypage)/mypage/components/AuthModal";
import QuitModal from "@/app/(mypage)/mypage/components/QuitModal";

export default function ModalContainer({
  idx,
  setIdx,
  isModal,
  setIsModal,
}: {
  idx: number;
  isModal: boolean;
  setIdx: Dispatch<SetStateAction<number>>;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [currentPw, setCurrentPw] = useState("");
  const renderModal = (index: number) => {
    switch (index) {
      case 0:
        return <ModalMain setIsModal={setIsModal} />;
      case 1:
        return <ProfileModal currentPw={currentPw} setCurrentPw={setCurrentPw} setIdx={setIdx} />;
      case 2:
        return <AuthModal currentPw={currentPw} setIsModal={setIsModal} setIdx={setIdx} />;
      case 3:
        return <QuitModal />;
      default:
        return;
    }
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModal(false);
      }
    };

    if (isModal) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModal, setIsModal]);

  return (
    <div className="fixed z-50 backdrop-blur-md bg-[rgba(0,0,0,0.5)] w-full h-[100vh] pb-[60px] flex justify-center items-center  inset-0 overflow-y-hidden">
      <div className=" overflow-y-scroll mt-20 rounded-3xl w-[590px] min-h-[450px] max-h-[600px]  px-[102px] pt-[40px] pb-[10px] bg-white flex flex-col justify-start items-center relative">
        <div className="w-full h-auto absolute top-4 right-4 z-50  flex justify-end items-cetner pr-4 ">
          <button onClick={() => setIsModal(false)}>
            <BasicIcon name="Close" color="black" size={36} />
          </button>
        </div>
        {renderModal(idx)}
      </div>
    </div>
  );
}
