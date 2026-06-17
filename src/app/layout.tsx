import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Аркадия — стоматологическая клиника · Санкт-Петербург · с 1989",
  description:
    "Стоматологическая клиника «Аркадия» в Санкт-Петербурге с 1989 года. 7 филиалов, рейтинг 4.9 на основе 216 отзывов 2ГИС. Имплантация, ортодонтия, детская стоматология.",
  keywords: [
    "Аркадия",
    "стоматология Санкт-Петербург",
    "стоматологическая клиника",
    "имплантация",
    "ортодонтия",
    "детская стоматология",
    "Невский",
    "Васильевский",
    "2ГИС 4.9",
  ],
  authors: [{ name: "Клиника «Аркадия»" }],
  openGraph: {
    title: "Аркадия — стоматологическая клиника в Петербурге с 1989 года",
    description:
      "7 филиалов · рейтинг 4.9 · 216 отзывов на 2ГИС. Стоматология для всей семьи с 1989 года.",
    siteName: "Аркадия",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${manrope.variable} antialiased bg-arkadia-cream text-arkadia-graphite`}
      >
        {children}
        <Toaster />
        <SonnerToaster
          position="top-center"
          theme="light"
          toastOptions={{
            style: {
              background: "#FFFFFF",
              color: "#1F2937",
              border: "1px solid #1E3A5F",
              borderRadius: "12px",
              fontFamily: "var(--font-manrope)",
            },
          }}
        />
      </body>
    </html>
  );
}
