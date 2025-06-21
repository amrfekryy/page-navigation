import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'], // or ['latin-ext'] or ['latin', 'cyrillic'] etc.
  variable: '--font-inter', // optional for CSS variables
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Page Navigation',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
