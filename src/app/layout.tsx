import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Batur Server - Panel Digital Terpercaya",
  description: "Solusi terpercaya untuk kebutuhan panel digital Anda. Panel Pterodactyl, Reseller Panel, Admin Panel dengan dukungan 24/7.",
  keywords: "panel pterodactyl, reseller panel, admin panel, hosting, server management",
  authors: [{ name: "Batur Server" }],
  creator: "Batur Server",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://baturserver.com",
    title: "Batur Server - Panel Digital Terpercaya",
    description: "Solusi terpercaya untuk kebutuhan panel digital Anda.",
    siteName: "Batur Server",
  },
  twitter: {
    card: "summary_large_image",
    title: "Batur Server - Panel Digital Terpercaya",
    description: "Solusi terpercaya untuk kebutuhan panel digital Anda.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
