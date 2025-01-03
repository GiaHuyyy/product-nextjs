import type { Metadata } from "next";

import { Roboto } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

import { Toaster } from "@/components/ui/toaster";
import AppProvider from "./AppProvider";
import { cookies } from "next/headers";

const roboto = Roboto({
  subsets: ["vietnamese"],
  display: "swap",
  adjustFontFallback: false,
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sesstionToken = cookieStore.get("sesstionToken");
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <Toaster />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <AppProvider initialSesstionToken={sesstionToken?.value}>
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
