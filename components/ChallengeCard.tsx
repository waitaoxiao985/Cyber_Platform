import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ChallengeCardProps {
  id: string
  title: string
  category: string
  difficulty: string
  points: number
  solveCount: number
}

function ChallengeCard({ id, title, category, difficulty, points, solveCount }: ChallengeCardProps) {
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
    <Card className="border-gray-800 bg-black/50 hover:border-neon-purple/50 transition-colors duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-neon-pink">{title}</CardTitle>
          <Badge variant="outline" className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <Badge variant="outline" className={getDifficultyColor(difficulty)}>
            {difficulty}
          </Badge>
          <span className="text-neon-blue font-mono">{points} pts</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <span className="text-sm text-gray-400">已解决: {solveCount}</span>
        <Link href={`/challenge/${id}`}>
          <button className="text-neon-purple hover:text-neon-pink transition-colors">
            查看详情 →
          </button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ChallengeCard
