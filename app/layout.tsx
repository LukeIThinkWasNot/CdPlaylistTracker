import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; // Assuming this exists from shadcn setup

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CD Tracklist Viewer",
  description: "Browse my CD tracklists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {" "}
      {/* Enforce dark mode */}
      <body className={`${inter.className} bg-trueBlack text-gray-100`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
