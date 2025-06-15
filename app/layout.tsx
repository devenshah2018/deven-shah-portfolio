import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://deven.shah"),
  title: "Deven Shah - Co-founder/CTO | Software Engineer",
  description:
    "Portfolio of Deven Shah, Co-founder/CTO of Suno Analytics and Graduate MSCS student at Boston University",
  keywords: ["Deven Shah", "Software Engineer", "CTO", "Suno Analytics", "Portfolio"],
  authors: [{ name: "Deven Shah" }],
  openGraph: {
    title: "Deven Shah - Co-founder/CTO | Software Engineer",
    description: "Portfolio of Deven Shah, Co-founder/CTO of Suno Analytics",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navigation />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
