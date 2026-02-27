import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/animations/smooth-scroll-provider";

export const metadata: Metadata = {
  title: "Landing Page",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
