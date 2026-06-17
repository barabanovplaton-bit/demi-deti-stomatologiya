import type { Metadata } from "next";
import { Onest, Golos_Text } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Аркадия — стоматологическая клиника · Санкт-Петербург · с 1989",
  description:
    "Стоматологическая клиника «Аркадия» в Санкт-Петербурге с 1989 года. 6 филиалов, рейтинг 4.9 на основе 216 отзывов 2ГИС. Имплантация, ортодонтия, детская стоматология.",
  keywords: [
    "Аркадия",
    "стоматология Санкт-Петербург",
    "имплантация",
    "ортодонтия",
    "детская стоматология",
    "2ГИС 4.9",
  ],
  authors: [{ name: "Клиника «Аркадия»" }],
  openGraph: {
    title: "Аркадия — стоматологическая клиника в Петербурге с 1989 года",
    description: "6 филиалов · рейтинг 4.9 · 216 отзывов на 2ГИС.",
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
        className={`${onest.variable} ${golos.variable} antialiased bg-arkadia-mist text-arkadia-graphite`}
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
              border: "1px solid #0000fa",
              borderRadius: "14px",
              fontFamily: "var(--font-golos)",
            },
          }}
        />
      </body>
    </html>
  );
}
