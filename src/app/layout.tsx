import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SystemBoot from "@/components/ui/SystemBoot";
import CustomCursor from "@/components/ui/CustomCursor";
import RightNavbar from "@/components/ui/RightNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammad Sarfraj Shah – Cyber Security Portfolio",
  description: "A premium Cyber Security & Cloud Engineer Portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative min-h-screen flex flex-col overflow-x-hidden">
              {/* Background elements */}
              <div className="bg-grid-pattern fixed inset-0 z-[-1]" />
              <div className="fixed inset-0 z-[-1] pointer-events-none">
                {/* Very subtle noise texture overlay could act here if needed, keeping it clean for now */}
              </div>

              <SystemBoot />
              <ThemeToggle />
              <ScrollProgress />
              <CustomCursor />
              <RightNavbar />
              <Navbar />
              <main className="flex-grow pt-24 w-full z-10 text-foreground">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
