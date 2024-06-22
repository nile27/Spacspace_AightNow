export const metadata = {
  title: "SignUp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-background w-[100vw] min-h-[100vh] flex justify-center items-center flex-col p-20  overflow-y-scroll ">
      <div className=" rounded-3xl w-[590px] min-h-[544px]  px-[102px] py-[80px] bg-white flex flex-col justify-start items-center  ">
        {children}
      </div>
    </section>
  );
}
