import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KO MIN SU | Cloud Engineer Portfolio",
  description: "인프라 오케스트레이션 및 AI 자동화 전문가 고민수의 포트폴리오입니다.",
  openGraph: {
    title: "고민수 포트폴리오",
    description: "AWS Hybrid Cloud & AI Agent 프로젝트 상세 보기",
    url: "https://puppylinux.cloud",
    images: [
      {
        url: "/og-image.png", // public 폴더에 1200x630 사이즈 이미지를 넣어두면 좋습니다.
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}


