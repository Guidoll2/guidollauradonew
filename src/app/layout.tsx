import type { Metadata } from 'next'
import { Inter, Open_Sans } from 'next/font/google'
import './globals.css'
import Head from 'next/head'
import { HTMLAttributes } from 'react';


const inter = Inter({ subsets: ['latin'] })

const open_sans = Open_Sans({
  subsets: ['latin'],
  weight: ['400' , '700' ,]
})

export const metadata: Metadata = {
  title: 'Web develop',
  description: 'By Guido Llaurado',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta name="language" content="en" />
      </Head>
      <body className={`${inter.className} ${open_sans.className}`}>{children}</body>
    </html>
  )
}