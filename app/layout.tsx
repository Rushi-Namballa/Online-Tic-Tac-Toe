import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { markers } from "./common"
config.autoAddCss = false

const outfit = Outfit({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Play Tic Tac Toe Online!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} text-white antialiased bg-orange-300`}
      >
        {children}
      </body>
    </html>
  )
}
