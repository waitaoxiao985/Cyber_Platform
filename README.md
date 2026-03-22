# CTF 竞赛平台

一个轻量级的 CTF 竞赛平台框架，基于 Next.js 16 (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Prisma + SQLite + NextAuth。

## 功能特性

- 认证系统：支持 email + 密码注册/登录
- 题目管理：按类别（Web, Crypto, Reverse, Pwn, Forensics, Misc）组织题目
- Flag 提交：Server Action 检查 flag 正确性，防止重复提交
- 排行榜：按分数降序显示用户排名
- 个人中心：查看已解决题目和总分
- 管理员面板：新增/编辑题目（仅 <admin@example.com> 可访问）
- 暗黑赛博风格：neon 紫/粉配色，现代化 UI

## 技术栈

- **前端**：Next.js 16 (App Router)、TypeScript、Tailwind CSS、shadcn/ui
- **后端**：Next.js Server Actions、NextAuth v5
- **数据库**：Prisma + SQLite

## 安装和运行

### 1. 克隆仓库

```bash
git clone <repository-url>
cd ctf-platform
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 文件并重命名为 `.env`，然后填写相应的环境变量：

```bash
cp .env.example .env
# 编辑 .env 文件，设置 NEXTAUTH_SECRET
```

### 4. 初始化数据库

```bash
# 推送数据库模型
npx prisma db push

# 填充初始数据（5个示例题目）
npx prisma db seed
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 <http://localhost:3000> 即可看到平台。

## 部署到 Vercel

1. 在 Vercel 上创建一个新的项目
2. 连接你的代码仓库
3. 在环境变量设置中添加：
   - `DATABASE_URL`: 可以使用 Vercel Postgres 或其他 SQLite 兼容的数据库
   - `NEXTAUTH_SECRET`: 生成一个随机字符串作为密钥
   - `NEXTAUTH_URL`: 你的 Vercel 项目 URL
4. 部署项目

## 管理员访问

使用邮箱 `admin@example.com` 注册/登录即可访问管理员面板（/admin）。

## 项目结构

```
├── app/                    # Next.js App Router 目录
│   ├── api/                # API 路由
│   ├── challenges/         # 题目列表页面
│   ├── challenge/          # 题目详情页面
│   ├── leaderboard/        # 排行榜页面
│   ├── profile/            # 个人页面
│   ├── admin/              # 管理员页面
│   ├── layout.tsx          # 根布局
│   └── page.tsx            # 首页
├── components/             # 组件目录
│   ├── ui/                 # shadcn/ui 组件
│   ├── ChallengeCard.tsx   # 题目卡片组件
│   ├── ChallengeForm.tsx   # 题目提交表单
│   ├── LeaderboardTable.tsx # 排行榜表格
│   └── Navbar.tsx          # 导航栏组件
├── lib/                    # 工具函数
├── prisma/                 # Prisma 目录
│   ├── schema.prisma       # 数据库模型
│   └── seed.ts             # 初始数据
├── public/                 # 静态资源
├── .env.example            # 环境变量示例
├── next.config.mjs         # Next.js 配置
├── package.json            # 项目依赖
└── README.md               # 项目说明
```

## 后续扩展

- 支持动态题目
- 添加题目附件上传
- 实现团队功能
- 增加比赛模式
- 完善管理员功能

