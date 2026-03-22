import { getLeaderboard } from '@/app/actions'
import LeaderboardTable from '@/components/LeaderboardTable'

export default async function LeaderboardPage() {
  const users = await getLeaderboard()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-neon-purple animate-neon-pulse">
        排行榜
      </h1>

      <div className="border border-gray-800 rounded-lg overflow-hidden">
        <LeaderboardTable users={users} />
      </div>

      {users.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          暂无数据
        </div>
      )}
    </div>
  )
}
