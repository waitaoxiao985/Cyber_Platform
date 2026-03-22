import Link from 'next/link'
import { Button } from '@/components/ui/button'
import CyberBackground from '@/components/CyberBackground'
import TypewriterText from '@/components/TypewriterText'

export default function HomePage() {
  return (
    <div className="py-8 min-h-screen relative overflow-hidden scanlines">
      {/* 动态背景 */}
      <CyberBackground />
      
      {/* 主内容 */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* 欢迎区域 */}
        <div className="text-center mb-16 mt-16">
          <h1 className="text-5xl md:text-6xl font-bold text-neon-purple animate-neon-pulse mb-6 animate-glitch">
            <TypewriterText 
              text="欢迎来到 CTF 平台" 
              speed={150}
              className="text-neon-purple"
            />
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-4">
            <TypewriterText 
              text="挑战自己，提升技能，成为 CTF 大师！" 
              speed={80}
              className="text-gray-300"
            />
          </p>
        </div>

        {/* 最新题目 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neon-pink mb-8">
            最新题目
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 题目卡片 1 */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300">
              <h3 className="text-xl font-bold text-neon-pink mb-4">
                取证挑战
              </h3>
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 bg-purple-900/30 text-neon-purple rounded-full text-sm font-medium">
                  Forensics
                </span>
                <span className="text-sm text-gray-400">
                  Hard
                </span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-neon-cyan font-bold">
                  380 pts
                </span>
                <span className="text-sm text-gray-400">
                  已解决: 0
                </span>
              </div>
              <Link 
                href="/challenge/cmmzorn8o0004gyjduvnkild4" 
                className="inline-block text-neon-purple hover:text-neon-pink transition-colors font-medium"
              >
                查看详情 →
              </Link>
            </div>

            {/* 题目卡片 2 */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300">
              <h3 className="text-xl font-bold text-neon-pink mb-4">
                Pwn基础
              </h3>
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 bg-purple-900/30 text-neon-purple rounded-full text-sm font-medium">
                  Pwn
                </span>
                <span className="text-sm text-gray-400">
                  Medium
                </span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-neon-cyan font-bold">
                  259 pts
                </span>
                <span className="text-sm text-gray-400">
                  已解决: 0
                </span>
              </div>
              <Link 
                href="/challenge/cmmzorn8o0004gyjduvnkild4" 
                className="inline-block text-neon-purple hover:text-neon-pink transition-colors font-medium"
              >
                查看详情 →
              </Link>
            </div>

            {/* 题目卡片 3 */}
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300">
              <h3 className="text-xl font-bold text-neon-pink mb-4">
                Web安全入门
              </h3>
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 bg-purple-900/30 text-neon-purple rounded-full text-sm font-medium">
                  Web
                </span>
                <span className="text-sm text-gray-400">
                  Easy
                </span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-neon-cyan font-bold">
                  100 pts
                </span>
                <span className="text-sm text-gray-400">
                  已解决: 0
                </span>
              </div>
              <Link 
                href="/challenge/cmmzorn8o0004gyjduvnkild4" 
                className="inline-block text-neon-purple hover:text-neon-pink transition-colors font-medium"
              >
                查看详情 →
              </Link>
            </div>
          </div>
        </section>

        {/* 快速操作 */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-neon-cyan mb-8">
            开始挑战
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/challenges">
              <Button className="bg-neon-purple hover:bg-neon-pink text-white px-8 py-6 text-lg font-bold transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(236,72,153,0.7)]">
                浏览所有题目
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="outline" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black px-8 py-6 text-lg font-bold transition-all duration-300">
                查看排行榜
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
