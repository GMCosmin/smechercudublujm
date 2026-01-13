import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TokenProvider } from '@/components/TokenProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LinuxToken.com - Free Linux Learning Platform',
  description: 'Learn Linux for free! Earn tokens by spending time on the platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TokenProvider>
          {children}
        </TokenProvider>
      </body>
    </html>
  )
}
