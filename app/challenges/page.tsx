import { getChallenges } from '@/app/actions'
import ChallengeCard from '@/components/ChallengeCard'

interface Challenge {
  id: string
  title: string
  category: string
  difficulty: string
  points: number
  solveCount: number
  description?: string
  flag?: string
  hint?: string
  createdAt?: Date
  updatedAt?: Date
}

export default async function ChallengesPage() {
  const challenges = await getChallenges() as Challenge[]

  // 按类别分组
  const challengesByCategory = challenges.reduce((acc: Record<string, Challenge[]>, challenge: Challenge) => {
    if (!acc[challenge.category]) {
      acc[challenge.category] = []
    }
    acc[challenge.category].push(challenge)
    return acc
  }, {} as Record<string, Challenge[]>)

  // 定义类别顺序
  const categories = ['Web', 'Crypto', 'Reverse', 'Pwn', 'Forensics', 'Misc']

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-neon-purple animate-neon-pulse">
        题目列表
      </h1>

      {categories.map((category) => {
        const categoryChallenges = challengesByCategory[category]
        if (!categoryChallenges || categoryChallenges.length === 0) {
          return null
        }

        return (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-bold text-neon-pink">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryChallenges.map((challenge: Challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  id={challenge.id}
                  title={challenge.title}
                  category={challenge.category}
                  difficulty={challenge.difficulty}
                  points={challenge.points}
                  solveCount={challenge.solveCount}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
