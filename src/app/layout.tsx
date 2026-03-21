import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ujjwal Kumar | Game Developer • ML Engineer • Backend Architect",
  description:
    "Portfolio of Ujjwal Kumar — Building multiplayer game worlds in Unity, training ML models for real-world impact, and engineering scalable backend systems. B.Tech CSE student at LPU, Software Engineer Intern at Eduniketan.",
  keywords: [
    "Ujjwal Kumar",
    "Game Developer",
    "ML Engineer",
    "Backend Architect",
    "Unity Developer",
    "Portfolio",
  ],
  authors: [{ name: "Ujjwal Kumar" }],
  openGraph: {
    title: "Ujjwal Kumar | Game Developer • ML Engineer • Backend Architect",
    description:
      "Building multiplayer game worlds in Unity, training ML models for real-world impact, and engineering scalable backend systems.",
    url: "https://ujjwalkumar.dev",
    siteName: "Ujjwal Kumar Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ujjwal Kumar | Game Developer • ML Engineer • Backend Architect",
    description:
      "Building multiplayer game worlds in Unity, training ML models for real-world impact, and engineering scalable backend systems.",
  },
  other: {
    "theme-color": "#0A0A0F",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable}`}>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
