import { notFound } from 'next/navigation'
import { getChallengeById } from '@/app/actions'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ChallengeForm from '@/components/ChallengeForm'

export default async function ChallengePage({ params }: { params: { id: string } }) {
  try {
    const challenge = await getChallengeById(params.id)
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!challenge) {
      notFound()
    }

    // 根据难度返回不同的颜色
    const getDifficultyColor = (difficulty: string) => {
      switch (difficulty.toLowerCase()) {
        case 'easy':
          return 'bg-green-500/20 text-green-400 border-green-500/30'
        case 'medium':
          return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        case 'hard':
          return 'bg-red-500/20 text-red-400 border-red-500/30'
        default:
          return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      }
    }

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-neon-purple animate-neon-pulse">
          {challenge.title}
        </h1>

        <div className="flex flex-wrap gap-4">
          <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
            {challenge.category}
          </Badge>
          <Badge className={getDifficultyColor(challenge.difficulty)}>
            {challenge.difficulty}
          </Badge>
          <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
            {challenge.points} pts
          </Badge>
          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
            已解决: {challenge.solveCount}
          </Badge>
        </div>

        <Card className="border-gray-800 bg-black/50">
          <CardHeader>
            <CardTitle className="text-xl">题目描述</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              className="prose prose-invert max-w-none"
            >
              {challenge.description}
            </ReactMarkdown>
          </CardContent>
        </Card>

        {challenge.hint && (
          <Card className="border-gray-800 bg-black/50">
            <CardHeader>
              <CardTitle className="text-xl">提示</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{challenge.hint}</p>
            </CardContent>
          </Card>
        )}

        <Card className="border-gray-800 bg-black/50">
          <CardHeader>
            <CardTitle className="text-xl">提交 Flag</CardTitle>
          </CardHeader>
          <CardContent>
            {user ? (
              <ChallengeForm
                challengeId={challenge.id}
              />
            ) : (
              <p className="text-gray-400">请先登录以提交 Flag</p>
            )}
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    console.error('Error loading challenge:', error)
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-neon-purple animate-neon-pulse">
          加载题目失败
        </h1>
        <Card className="border-gray-800 bg-black/50">
          <CardHeader>
            <CardTitle className="text-xl">错误信息</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-400">抱歉，加载题目时出现错误。请稍后再试。</p>
            <p className="text-gray-400 mt-2">如果问题持续存在，请联系管理员。</p>
          </CardContent>
        </Card>
      </div>
    )
  }
}
