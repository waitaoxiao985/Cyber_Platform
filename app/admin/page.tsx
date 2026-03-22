import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getChallenges } from '@/app/actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  // 检查是否是管理员
  if (!user || user.email !== 'admin@example.com') {
    redirect('/')
  }

  const challenges = await getChallenges()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-neon-purple animate-neon-pulse">
        管理员面板
      </h1>

      <Card className="border-gray-800 bg-black/50">
        <CardHeader>
          <CardTitle className="text-xl">新增题目</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                标题
              </label>
              <Input className="border-gray-700 bg-black/50 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                类别
              </label>
              <Input className="border-gray-700 bg-black/50 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                难度
              </label>
              <Input className="border-gray-700 bg-black/50 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                分数
              </label>
              <Input type="number" className="border-gray-700 bg-black/50 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Flag
              </label>
              <Input className="border-gray-700 bg-black/50 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                提示
              </label>
              <Input className="border-gray-700 bg-black/50 text-white" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                描述
              </label>
              <textarea 
                id="description"
                className="w-full border border-gray-700 bg-black/50 text-white p-3 rounded-md"
                rows={4}
              ></textarea>
            </div>
            <Button className="bg-neon-purple hover:bg-neon-purple/80 text-white">
              新增题目
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-gray-800 bg-black/50">
        <CardHeader>
          <CardTitle className="text-xl">题目列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge: any) => (
              <div key={challenge.id} className="flex justify-between items-center p-3 border border-gray-800 rounded-lg">
                <div>
                  <h3 className="font-bold text-neon-pink">{challenge.title}</h3>
                  <p className="text-sm text-gray-400">{challenge.category} - {challenge.difficulty} - {challenge.points} pts</p>
                </div>
                <Button variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple/10">
                  编辑
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
