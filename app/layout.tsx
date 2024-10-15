'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import ThemeToggle from './components/ThemeToggle'
import { ThemeProvider } from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-950 min-h-screen">
            {children}
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}