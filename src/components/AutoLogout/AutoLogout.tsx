// "use client";
// import { useEffect } from "react";
// import { signOut, useSession } from "next-auth/react";

// export default function AutoLogout() {
//   const { status } = useSession();

//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       sessionStorage.setItem("isLoggedOut", "true");
//     };

//     if (status === "authenticated") {
//       window.addEventListener("beforeunload", handleBeforeUnload);
//     }

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [status]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       if (sessionStorage.getItem("isLoggedOut") === "false" && status === "authenticated") {
//         alert("aaaaa");
//         signOut({ redirect: false });
//       }
//     }
//   }, [status]);

//   return null;
// }
