import type { Metadata } from "next";
import { Poppins, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/client/components/layout/footer/Footer";
import Header from "@/client/components/layout/header/Header";
import { SITE_DESCRIPTION, SITE_NAME } from "@/client/lib/site-config";

// 日本語は Zen Kaku Gothic New（太く字間を広く）、英数字は Poppins
const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/social/og_image.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/social/og_image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head />
      <body
        className={`${poppins.variable} ${zenKaku.variable} antialiased pt-24 flex flex-col min-h-screen`}
      >
        <Header />
        <div className="flex-grow">{children}</div>
        <div className="mt-0 sm:mt-16">
          <Footer />
        </div>
        <SpeedInsights sampleRate={0.1} />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_TRACKING_ID || ""} />
      </body>
    </html>
  );
}
