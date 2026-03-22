import { redirect } from 'next/navigation'
import { getServerAuthSession } from '@/lib/auth'
import { getUserSolvedChallenges, getUserScore } from '@/app/actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function ProfilePage() {
  const session = await getServerAuthSession()
  const user = session?.user

  if (!user) {
    redirect('/auth/signin')
  }

  const solvedChallenges = await getUserSolvedChallenges((user as any).id)
  const userScore = await getUserScore((user as any).id)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-neon-purple animate-neon-pulse">
        个人中心
      </h1>

      <Card className="border-gray-800 bg-black/50">
        <CardHeader>
          <CardTitle className="text-xl">个人信息</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong className="text-neon-pink">用户名:</strong> {user.name || (user.email ? user.email.split('@')[0] : '未知')}</p>
            <p><strong className="text-neon-pink">邮箱:</strong> {user.email || '未知'}</p>
            <p><strong className="text-neon-pink">总分:</strong> {userScore?.score || 0}</p>
            <p><strong className="text-neon-pink">已解决题目:</strong> {userScore?.solveCount || 0}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-800 bg-black/50">
        <CardHeader>
          <CardTitle className="text-xl">已解决题目</CardTitle>
        </CardHeader>
        <CardContent>
          {solvedChallenges.length > 0 ? (
            <div className="space-y-4">
              {solvedChallenges.map((challenge) => (
                <div key={challenge.id} className="flex justify-between items-center p-3 border border-gray-800 rounded-lg hover:border-neon-purple/50 transition-colors">
                  <div>
                    <h3 className="font-bold text-neon-pink">{challenge.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                        {challenge.category}
                      </Badge>
                      <Badge variant="outline" className="bg-neon-blue/20 text-neon-blue border-neon-blue/30">
                        {challenge.points} pts
                      </Badge>
                    </div>
                  </div>
                  <a 
                    href={`/challenge/${challenge.id}`} 
                    className="text-neon-purple hover:text-neon-pink transition-colors"
                  >
                    查看 →
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">尚未解决任何题目</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
