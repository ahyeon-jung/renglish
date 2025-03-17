import "../styles/globals.css";

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
      </body>
    </html>
  );
}
