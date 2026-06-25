import type { Metadata } from "next";
import { Manrope, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Chess Roaster 🔥 | Spotify Wrapped + Stand-up Roast for Chess Players",
  description: "Get roasted by dynamic AI commentary based on your Chess.com and Lichess profiles. Ply-by-ply match analysis, neon wrap-up cards, and pure comedic Roast.",
  metadataBase: new URL("https://chessroaster.com"),
  openGraph: {
    title: "Chess Roaster 🔥 | Spotify Wrapped for Chess",
    description: "Get roasted by dynamic AI commentary on your chess openings, blunders, and rating stats.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
