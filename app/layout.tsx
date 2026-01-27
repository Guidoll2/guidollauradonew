import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { CartProvider } from "@/lib/cart-context";
import { ThemeProvider } from "@/lib/theme-context";
import { RegionProvider } from "@/lib/region-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guidoll.dev - Desarrollo Web Premium en Barcelona",
  description: "Diseño web premium para tu proyecto en Barcelona. Desarrollo web moderno, experiencia UI/UX e integraciones personalizadas.",
  keywords: "desarrollo web, diseño web, Barcelona, freelance, UI/UX, React, Next.js",
  authors: [{ name: "Guido Llauradó" }],
  creator: "Guidoll.dev",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Guidoll.dev - Desarrollo Web Premium en Barcelona",
    description: "Transformo ideas en experiencias digitales excepcionales",
    url: "https://guidoll.dev",
    siteName: "Guidoll.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guidoll.dev - Desarrollo Web Premium",
    description: "Diseño web premium para tu proyecto en Barcelona",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <CartProvider>
            <LanguageProvider>
              <RegionProvider>
                {children}
              </RegionProvider>
            </LanguageProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
