import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { defaultLocale, isLocale } from "@/i18n/config";
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
  title: "FitGN Rail",
  description: "Professional GN rail systems built in Belgium.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
  params?: { locale?: string };
}>;

export default function RootLayout({ children, params }: RootLayoutProps) {
  const langCandidate = params?.locale;
  const lang = langCandidate && isLocale(langCandidate) ? langCandidate : defaultLocale;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
