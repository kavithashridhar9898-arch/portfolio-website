import { Geist, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aether.OS | Digital Architecture Syndicate",
  description: "Crafting the Future of Digital Architecture",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${inter.variable} ${spaceMono.variable} antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-body bg-background text-on-surface noise-overlay">
        {children}
      </body>
    </html>
  );
}
