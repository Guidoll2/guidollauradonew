import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '400' , '700' ,]
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta charSet="UTF-8" />
        <meta name="language" content="en" />
      </Head>
      <body className={`${inter.className} ${poppins.className}`}>{children}</body>
    </html>
  )
}