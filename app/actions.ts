'use server'

import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { signIn, signOut } from 'next-auth/react'

export async function submitFlag(challengeId: string, flag: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return { success: false, message: '请先登录' }
  }

  const userId = (session.user as any).id

  // 检查是否已经提交过正确的 flag
  const existingSubmission = await prisma.submission.findUnique({
    where: { userId_challengeId: { userId, challengeId } },
  })

  if (existingSubmission?.isCorrect) {
    return { success: false, message: '已经提交过正确的 flag' }
  }

  // 获取挑战信息
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
  })

  if (!challenge) {
    return { success: false, message: '挑战不存在' }
  }

  // 验证 flag
  const isCorrect = flag === challenge.flag

  if (isCorrect) {
    // 开始事务
    await prisma.$transaction(async (prisma: any) => {
      // 创建提交记录
      await prisma.submission.create({
        data: {
          userId,
          challengeId,
          flag,
          isCorrect: true,
        },
      })

      // 更新用户分数和解决数
      await prisma.user.update({
        where: { id: userId },
        data: {
          score: { increment: challenge.points },
          solveCount: { increment: 1 },
        },
      })

      // 更新挑战的解决数
      await prisma.challenge.update({
        where: { id: challengeId },
        data: {
          solveCount: { increment: 1 },
        },
      })
    })

    return { success: true, message: 'Flag 正确！' }
  } else {
    // 创建错误的提交记录
    await prisma.submission.create({
      data: {
        userId,
        challengeId,
        flag,
        isCorrect: false,
      },
    })

    return { success: false, message: 'Flag 不正确' }
  }
}

export async function getLeaderboard() {
  const users = await prisma.user.findMany({
    orderBy: { score: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      score: true,
      solveCount: true,
    },
  })

  // 添加排名
  const usersWithRank = users.map((user: any, index: number) => ({
    ...user,
    rank: index + 1,
  }))

  return usersWithRank
}

export async function getChallenges() {
  const challenges = await prisma.challenge.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return challenges
}

export async function getChallengeById(id: string) {
  try {
    const challenge = await prisma.challenge.findUnique({
      where: { id },
    })

    return challenge
  } catch (error) {
    console.error('Error fetching challenge by id:', error)
    throw error
  }
}

export async function getUserSolvedChallenges(userId: string) {
  const submissions = await prisma.submission.findMany({
    where: { userId, isCorrect: true },
    include: { challenge: true },
    orderBy: { createdAt: 'desc' },
  })

  return submissions.map((submission: any) => submission.challenge)
}

export async function getUserScore(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { score: true, solveCount: true },
  })

  return user
}
