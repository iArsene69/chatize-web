import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { SupabaseUserProvider } from "@/lib/providers/supabase-user-provider";
import AppStateProvider from "@/lib/providers/app-state-provider";
import { ThemeProvider } from "@/lib/providers/theme-provider";

const fontSans = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableColorScheme
          enableSystem
          disableTransitionOnChange
        >
          <AppStateProvider>
            <SupabaseUserProvider>
              {children}
              <Toaster />
            </SupabaseUserProvider>
          </AppStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
