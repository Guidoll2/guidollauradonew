import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import Head from 'next/head'
import { ClerkProvider } from "@clerk/nextjs";


const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700']
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
       <ClerkProvider>
    <html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta name="language" content="en" />
      </Head>
      <body className={`${lato.className}`}>{children}</body>
    </html></ClerkProvider>
  )
}