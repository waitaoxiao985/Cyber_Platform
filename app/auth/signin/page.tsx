'use client'

import { signIn, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SignInPage() {
  const { data: session } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  // 检测URL中的错误参数
  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam) {
      setError('登录失败，请检查邮箱和密码')
      // 使用replace导航，避免浏览器历史记录问题
      router.replace('/auth/signin')
    }
  }, [searchParams, router])

  // 如果已经登录，重定向到首页
  useEffect(() => {
    if (session?.user) {
      router.replace('/')
    }
  }, [session, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/',
    })

    if (result?.error) {
      setError('登录失败，请检查邮箱和密码')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 border border-gray-800 rounded-lg bg-gray-900">
        <h1 className="text-2xl font-bold mb-6 text-center text-neon-purple">
          登录 / 注册
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              邮箱
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              密码
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-neon-purple hover:bg-neon-purple/80 text-black font-medium"
          >
            登录 / 注册
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>首次登录会自动创建账号</p>
        </div>
      </div>
    </div>
  )
}
