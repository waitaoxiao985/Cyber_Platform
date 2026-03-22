'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession, SessionProvider } from 'next-auth/react'
import { useState, useEffect } from 'react'

function NavbarContent() {
  const { data: session, status } = useSession()
  const user = session?.user

  return (
    <nav className="border-b border-gray-800 bg-black/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-neon-purple animate-neon-pulse">
            CTF Platform
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/challenges" className="text-gray-300 hover:text-neon-pink">
            题目
          </Link>
          <Link href="/leaderboard" className="text-gray-300 hover:text-neon-pink">
            排行榜
          </Link>
          {user && (
            <Link href="/profile" className="text-gray-300 hover:text-neon-pink">
              个人中心
            </Link>
          )}
          {user?.email === 'admin@example.com' && (
            <Link href="/admin" className="text-gray-300 hover:text-neon-pink">
              管理
            </Link>
          )}
          {user ? (
            <Button
              variant="outline"
              onClick={() => signOut()}
              className="border-neon-purple text-neon-purple hover:bg-neon-purple/10"
            >
              退出
            </Button>
          ) : (
            <Link href="/auth/signin">
              <Button
                variant="outline"
                className="border-neon-purple text-neon-purple hover:bg-neon-pink/10"
              >
                登录 / 注册
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

function Navbar() {
  return (
    <NavbarContent />
  )
}

export default Navbar
