import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import WhatsappFloating from "@/app/components/WhatsappFloating";
import Footer from "@/app/components/Footer";

// Google Fonts setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the app
export const metadata: Metadata = {
  title: "Doppel Homes",
  description: "Doppel Homes - Verified Land Sales and Advisory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header with sub-header */}
       
        <Header />

        {/* Main content */}
        <main className="min-h-screen">
          {children}
          <WhatsappFloating />
          <Footer />
          
        </main>
        
      </body>
    </html>
  );
}
