import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 清除现有数据
  await prisma.submission.deleteMany({})
  await prisma.challenge.deleteMany({})
  await prisma.user.deleteMany({})

  // 创建示例题目
  const challenges = [
    {
      title: "Web 入门",
      description: "这是一个简单的 Web 题目，尝试找到页面中的 flag。",
      category: "Web",
      difficulty: "Easy",
      points: 100,
      flag: "flag{hello_web_ctf}",
      hint: "检查页面源代码"
    },
    {
      title: "密码学基础",
      description: "尝试解密以下内容：SGVsbG8gQ3RGIQ==",
      category: "Crypto",
      difficulty: "Easy",
      points: 150,
      flag: "flag{hello_crypto_ctf}",
      hint: "Base64 解码"
    },
    {
      title: "逆向工程入门",
      description: "分析这个简单的二进制文件，找到 flag。",
      category: "Reverse",
      difficulty: "Medium",
      points: 200,
      flag: "flag{hello_reverse_ctf}",
      hint: "使用反汇编工具"
    },
    {
      title: "Pwn 基础",
      description: "利用缓冲区溢出获取 shell。",
      category: "Pwn",
      difficulty: "Medium",
      points: 250,
      flag: "flag{hello_pwn_ctf}",
      hint: "检查栈溢出漏洞"
    },
    {
      title: "取证挑战",
      description: "从这个文件中提取 flag。",
      category: "Forensics",
      difficulty: "Hard",
      points: 300,
      flag: "flag{hello_forensics_ctf}",
      hint: "检查文件元数据"
    }
  ]

  for (const challenge of challenges) {
    await prisma.challenge.create({
      data: challenge
    })
  }

  console.log("示例题目已创建")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
