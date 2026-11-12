import type { Metadata } from "next";
import { Poppins, Zen_Kaku_Gothic_New } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NumberInputWheelGuard } from "@/client/components/layout/NumberInputWheelGuard";
import { Toaster } from "@/client/components/ui";
import { buildAdminPageTitle, DEPLOY_TARGET_ENV } from "@/client/lib/deploy-environment";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// 日本語は Zen Kaku Gothic New（公開サイトと同じ書体）
const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-zen-kaku",
  display: "swap",
});

export const metadata: Metadata = {
  title: buildAdminPageTitle(DEPLOY_TARGET_ENV),
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${poppins.variable} ${zenKaku.variable}`}>
      <body>
        {children}
        <Toaster />
        <NumberInputWheelGuard />
        <SpeedInsights />
      </body>
    </html>
  );
}
