"use client";

import { useLoginStore } from "@/Store/store";
import Header from "@/components/Header";
import GuestHome from "@/features/Main/GuestHome";
import UserHome from "@/features/Main/UserHome";

export default function Main() {
  const isLoggedIn = useLoginStore(state => state.isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header />
          <div className="h-full">
            <UserHome />
          </div>
        </>
      ) : (
        <GuestHome />
      )}
    </>
  );
}
