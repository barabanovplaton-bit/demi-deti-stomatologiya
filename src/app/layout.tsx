import type { Metadata } from "next";
import { Onest, Golos_Text } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
const onest = Onest({ variable: "--font-onest", subsets: ["latin", "cyrillic"], display: "swap", weight: ["400","500","600","700","800"] });
const golos = Golos_Text({ variable: "--font-golos", subsets: ["latin", "cyrillic"], display: "swap", weight: ["400","500","600","700"] });
export const metadata: Metadata = {
  title: "ДЕМИ ДЕТИ — Детская стоматология · Санкт-Петербург · с 2010",
  description: "Детская стоматология «ДЕМИ ДЕТИ» в Санкт-Петербурге с 2010 года. 1 филиал, рейтинг 588, 632 отзывов.",
  keywords: ["ДЕМИ ДЕТИ", "стоматология Санкт-Петербург"],
  authors: [{ name: "Клиника «ДЕМИ ДЕТИ»" }],
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  openGraph: { title: "ДЕМИ ДЕТИ — Детская стоматология в Петербурге с 2010 года", description: "1 филиал · рейтинг 588 · 632 отзывов.", siteName: "ДЕМИ ДЕТИ", type: "website" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (<html lang="ru" suppressHydrationWarning><body className={`${onest.variable} ${golos.variable} antialiased bg-arkadia-mist text-arkadia-graphite`}>{children}<Toaster /><SonnerToaster position="top-center" theme="light" toastOptions={{ style: { background: "#FFFFFF", color: "#1F2937", border: "1px solid #7C3AED", borderRadius: "14px", fontFamily: "var(--font-golos)" } }} /></body></html>);
}
