# CTF 竞赛平台项目结构

## 项目根目录

```
├── app/                    # Next.js App Router 目录
│   ├── api/                # API 路由
│   │   └── auth/           # 认证相关 API
│   │       └── [...nextauth]/  # NextAuth 配置
│   │           └── route.ts    # 认证路由
│   ├── challenges/         # 题目列表页面
│   │   └── page.tsx        # 题目列表组件
│   ├── challenge/          # 题目详情页面
│   │   └── [id]/           # 动态路由
│   │       └── page.tsx    # 题目详情组件
│   ├── leaderboard/        # 排行榜页面
│   │   └── page.tsx        # 排行榜组件
│   ├── profile/            # 个人页面
│   │   └── page.tsx        # 个人页面组件
│   ├── admin/              # 管理员页面
│   │   └── page.tsx        # 管理员组件
│   ├── layout.tsx          # 根布局
│   └── page.tsx            # 首页
├── components/             # 组件目录
│   ├── ui/                 # shadcn/ui 组件
│   │   ├── badge.tsx       # 徽章组件
│   │   ├── button.tsx      # 按钮组件
│   │   ├── card.tsx        # 卡片组件
│   │   ├── input.tsx       # 输入框组件
│   │   └── table.tsx       # 表格组件
│   ├── ChallengeCard.tsx   # 题目卡片组件
│   ├── ChallengeForm.tsx   # 题目提交表单
│   ├── LeaderboardTable.tsx # 排行榜表格
│   └── Navbar.tsx          # 导航栏组件
├── lib/                    # 工具函数
│   ├── auth.ts             # 认证相关函数
│   ├── db.ts               # 数据库连接
│   └── utils.ts            # 通用工具函数
├── prisma/                 # Prisma 目录
│   ├── schema.prisma       # 数据库模型
│   └── seed.ts             # 初始数据
├── public/                 # 静态资源
├── .env.example            # 环境变量示例
├── next.config.mjs         # Next.js 配置
├── package.json            # 项目依赖
├── README.md               # 项目说明
└── tsconfig.json           # TypeScript 配置
```

## 文件作用说明

### 根目录文件
- **package.json**: 项目依赖配置，包含所有需要的包
- **tsconfig.json**: TypeScript 配置文件
- **next.config.mjs**: Next.js 配置文件
- **.env.example**: 环境变量示例文件
- **README.md**: 项目说明文档

### app 目录
- **app/layout.tsx**: 根布局组件，包含全局样式和导航栏
- **app/page.tsx**: 首页组件，显示欢迎信息、最新题目和排行榜预览
- **app/challenges/page.tsx**: 题目列表页面，按类别展示所有题目
- **app/challenge/[id]/page.tsx**: 题目详情页面，显示题目描述和提交表单
- **app/leaderboard/page.tsx**: 完整排行榜页面
- **app/profile/page.tsx**: 个人页面，显示用户已解决题目和总分
- **app/admin/page.tsx**: 管理员页面，用于新增和编辑题目
- **app/api/auth/[...nextauth]/route.ts**: NextAuth 认证配置

### components 目录
- **components/ui/**: shadcn/ui 组件，包含基础 UI 元素
- **components/ChallengeCard.tsx**: 题目卡片组件，用于首页和题目列表
- **components/ChallengeForm.tsx**: 题目提交表单，用于提交 flag
- **components/LeaderboardTable.tsx**: 排行榜表格组件
- **components/Navbar.tsx**: 导航栏组件，包含登录/注册链接

### lib 目录
- **lib/auth.ts**: 认证相关函数，用于获取当前用户
- **lib/db.ts**: 数据库连接配置
- **lib/utils.ts**: 通用工具函数

### prisma 目录
- **prisma/schema.prisma**: 数据库模型定义，包含 User、Challenge、Submission 模型
- **prisma/seed.ts**: 初始数据脚本，添加 5 个示例题目

### public 目录
- 存放静态资源文件，如图片、图标等
