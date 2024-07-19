import localFont from "next/font/local";

export const metadata = {
  title: "Login",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
