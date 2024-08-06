import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer/footer";
import { AI } from "@/app/(app)/chat/actions";

export const metadata: Metadata = {
  title: "Git Ai",
  description:
    "Visualizacion y analisis de repositorios de git con inteligencia artificial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <AI>
        <html lang="en" className={GeistMono.className}>
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Footer />
            </ThemeProvider>
          </body>
        </html>
      </AI>
    </ViewTransitions>
  );
}
