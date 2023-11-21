import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "./components/SessionProvider";
import { getServerSession } from "next-auth";
import NavMenu from "./components/Navigation";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <SessionProvider session={session}>
            <NavMenu />
            {children}
          </SessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
