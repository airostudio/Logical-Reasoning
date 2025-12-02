import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Logical Reasoning Test - Unlock Your Cognitive Potential',
  description: 'Test your logical reasoning abilities with our world-class aptitude assessment. Get instant results for only $2.99!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
