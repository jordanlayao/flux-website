import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll-provider";
import { DevTools } from "@/components/dev-tools";

export const metadata: Metadata = {
  title: "Flux — Treasury Intelligence",
  description:
    "Real-time visibility into cash across every entity, account, and currency. Stop reacting to yesterday's data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <DevTools />
      </body>
    </html>
  );
}
