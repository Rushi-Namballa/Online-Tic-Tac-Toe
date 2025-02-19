import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css"

const outfit = Outfit({
  weight: "variable"
})

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Play tic tac toe online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
