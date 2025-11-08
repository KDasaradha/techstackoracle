import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech Stack Oracle - AI-Powered Architecture Guidance",
  description: "Navigate the complex world of system design and technology selection with confidence. Get personalized, AI-powered recommendations for your next project.",
  keywords: ["Tech Stack", "System Design", "Architecture", "AI Recommendations", "Development", "Next.js", "React"],
  authors: [{ name: "Tech Stack Oracle Team" }],
  icons: {
    icon: "/tech-stack-oracle-logo.png",
  },
  openGraph: {
    title: "Tech Stack Oracle",
    description: "Your intelligent companion for modern software architecture decisions",
    url: "https://tech-stack-oracle.com",
    siteName: "Tech Stack Oracle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Stack Oracle",
    description: "AI-powered system design and tech stack recommendations",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
