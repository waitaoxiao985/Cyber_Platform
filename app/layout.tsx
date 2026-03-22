import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import ClientProvider from '@/components/ClientProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CTF Platform',
  description: '轻量级 CTF 竞赛平台',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <body className={inter.className}>
        <ClientProvider>
          <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-gray-100">
            <Navbar />
            <main className="container py-8">
              {children}
            </main>
          </div>
        </ClientProvider>
      </body>
    </html>
  )
}
