import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jen Jose Jeeson - Portfolio',
  description: 'Contact me using this portfolio website.',
  icons:{
    icon:'/favicon/JJJ.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
