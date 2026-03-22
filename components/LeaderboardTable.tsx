import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface UserRank {
  id: string
  name: string | null
  email: string
  score: number
  solveCount: number
  rank: number
}

interface LeaderboardTableProps {
  users: UserRank[]
}

function LeaderboardTable({ users }: LeaderboardTableProps) {
  return (
    <Table className="w-full border-gray-800">
      <TableHeader className="border-gray-800 bg-black/50">
        <TableRow>
          <TableHead className="text-gray-300">排名</TableHead>
          <TableHead className="text-gray-300">用户</TableHead>
          <TableHead className="text-gray-300">分数</TableHead>
          <TableHead className="text-gray-300">解决数</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-gray-800">
        {users.map((user) => (
          <TableRow key={user.id} className="border-gray-800 hover:bg-gray-900/50">
            <TableCell className="font-mono text-neon-blue">{user.rank}</TableCell>
            <TableCell className="text-gray-300">
              {user.name || user.email.split('@')[0]}
            </TableCell>
            <TableCell className="font-mono text-neon-pink">{user.score}</TableCell>
            <TableCell className="font-mono text-neon-green">{user.solveCount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default LeaderboardTable
