import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import './globals.css';


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SuperWow - Extraordinary Digital Experiences",
  description: "Creating stunning, interactive web experiences that push the boundaries of what's possible on the web.",
  keywords: "web design, interactive, 3D, animations, Next.js, React",
  authors: [{ name: "SuperWow Team" }],
  openGraph: {
    title: "SuperWow - Extraordinary Digital Experiences",
    description:
      "Creating stunning, interactive web experiences that push the boundaries of what's possible on the web.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SuperWow - Extraordinary Digital Experiences",
    description:
      "Creating stunning, interactive web experiences that push the boundaries of what's possible on the web.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
