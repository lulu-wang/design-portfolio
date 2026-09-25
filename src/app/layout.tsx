import type { Metadata } from "next";
import localFont from "next/font/local";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SiteGrain from "@/components/SiteGrain";
import SmoothScroll from "@/components/SmoothScroll";

const body = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lulu Wang — Product Designer & Developer",
  description:
    "Product designer & developer inspired to push the boundaries of design. Previously at Meta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${body.variable} ${archivo.variable} ${inter.variable} antialiased`}
      >
        <SiteGrain />
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
