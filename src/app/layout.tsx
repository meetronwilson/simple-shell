import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LayoutProvider } from "@/context/LayoutContext"
import AppLayout from "@/components/layout/AppLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SaaS App",
  description: "Modern SaaS application layout",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LayoutProvider>
            <AppLayout>{children}</AppLayout>
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

