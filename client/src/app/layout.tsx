import "../styles/globals.css";

import Head from "next/head";
import Header from "@/components/Header";
import type { Metadata } from "next";
import Script from "next/script";

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
      <Head>
        <link
          rel="manifest"
          href="/manifest.json"
          crossOrigin="use-credentials"
        ></link>
      </Head>
      <body>
        <Header />
        {children}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-S1SBJD2VP3"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-S1SBJD2VP3');
          `}
        </Script>
      </body>
    </html>
  );
}
