import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "RamdanClss.AI — Platform Pelatihan AI Agent & Robotika",
  description:
    "Belajar membuat robot otonom, AI agents, dan sistem cerdas dari nol. Kelas hands-on dengan mentor berpengalaman dan proyek nyata.",
  keywords: [
    "pelatihan AI",
    "AI agents",
    "robotika",
    "machine learning",
    "belajar AI",
    "kursus robot",
    "artificial intelligence",
  ],
  authors: [{ name: "RamdanClss.AI" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://ramdanclss.ai",
    title: "RamdanClss.AI — Platform Pelatihan AI Agent & Robotika",
    description:
      "Belajar membuat robot otonom, AI agents, dan sistem cerdas dari nol.",
    siteName: "RamdanClss.AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "RamdanClss.AI — Platform Pelatihan AI Agent & Robotika",
    description:
      "Belajar membuat robot otonom, AI agents, dan sistem cerdas dari nol.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
