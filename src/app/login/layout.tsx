import localFont from "next/font/local";

export const metadata = {
  title: "Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`font-pretendard`}>{children}</div>;
}
