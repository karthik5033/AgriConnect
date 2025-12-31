import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "AgriConnect - Professional Network for Agriculture",
  description: "Connect with farmers, researchers, and agricultural professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
