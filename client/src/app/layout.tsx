import "../styles/globals.css";

import { ENV } from "@/constants/env";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "REnglish",
  description: "Improve your English skills with scripts",
  keywords: [
    "English",
    "Learning",
    "Practice",
    "영어 공부",
    "영어 대본",
    "대본",
  ],
  openGraph: {
    title: "REnglish",
    description: "Improve your English skills with scripts",
    type: "website",
    url: "https://renglish.vercel.app/",
  },
  verification: {
    google: ENV.GC_ID, 
  },
};

type LayoutProps = {
  components: React.ReactNode;
  actions: React.ReactNode;
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <link
        rel="manifest"
        href="/manifest.json"
        crossOrigin="use-credentials"
      ></link>
      <body>
        <Header />
        {children}
        <GoogleAnalytics gaId={ENV.GA_ID} />
      </body>
    </html>
  );
}
