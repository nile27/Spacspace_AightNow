import localFont from "next/font/local";

export const metadata = {
  title: "SignUp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
