import type { Metadata, Viewport } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Magdiel Eric — Editor de vídeo & motion",
  description:
    "Portfólio de Magdiel Eric: edição de vídeo, motion design e color grade. Premiere Pro, After Effects e DaVinci Resolve.",
  keywords: [
    "editor de vídeo",
    "motion design",
    "After Effects",
    "Premiere Pro",
    "DaVinci Resolve",
    "portfólio",
  ],
  openGraph: {
    title: "Magdiel Eric — Editor de vídeo & motion",
    description:
      "3 anos de timeline. Corte, motion e cor para YouTube, social e projetos narrativos.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
