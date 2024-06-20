"use client";

import { useState } from "react";

export default function Dropdowntset() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative inline-block text-left">
        <div className="flex flex-col text-black/opacity-20 font-['Pretendard'] font-bold">
          회원탈퇴 사유
          <button
            type="button"
            className="w-[385px] h-16 inline-flex  justify-between items-center  rounded-lg bg-white p-4 text-md font-['Pretendard'] text-neutral-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setIsOpen(!isOpen)}
          >
            탈퇴사유를 선택해주세요.
            <svg
              className={`h-5 w-5 text-gray-400  transform ${isOpen ? "rotate-180" : "rotate - 0"}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div
            className="w-[385px] h-70 absolute right-0 z-10  font-pretendard  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1 " role="none">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                role="menuitem"
                id="menu-item-0"
              >
                Account settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                role="menuitem"
                id="menu-item-1"
              >
                Support
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                role="menuitem"
                id="menu-item-2"
              >
                License
              </a>
              <form method="POST" action="#" role="none">
                <button
                  type="submit"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  role="menuitem"
                  id="menu-item-3"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
