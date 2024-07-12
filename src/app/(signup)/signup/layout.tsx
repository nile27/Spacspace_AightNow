import SessionProvider from "@/app/(Login)/components/SessionProvider";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "SignUp",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig);
  return (
    <SessionProvider session={session}>
      <section className="bg-background w-[100vw] min-h-[100vh] flex justify-center items-center flex-col p-20  overflow-y-scroll ">
        <div className="absolute top-[15%] rounded-3xl w-[590px] min-h-[544px]  px-[102px] py-[50px] bg-white flex flex-col justify-start items-center pb-[20px]  ">
          {children}
        </div>
      </section>
    </SessionProvider>
  );
}
