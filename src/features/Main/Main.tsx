"use client";

import { useLoginStore } from "@/Store/store";
import Header from "@/components/Header";
import GuestHome from "@/features/Main/GuestHome";
import UserHome from "@/features/Main/UserHome";
import useStore from "@/features/Main/components/useStore";

export default function Main() {
  // const isLoggedIn = useLoginStore(state => state.isLoggedIn);
  const isLoggedIn = useStore(useLoginStore, state => state.isLoggedIn);

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
