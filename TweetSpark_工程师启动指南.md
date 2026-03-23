# TweetSpark 工程师启动指南
**版本：v1.0 | 目标：8小时完成核心开发 | 作者：阿码 (Tech)**

## 🚀 快速开始（5分钟）

### 1. 环境准备
```bash
# 确保已安装Node.js 18+
node --version  # 应该 >= 18

# 进入项目目录
cd /Users/ericshen/.qclaw/workspace/tweetspark
```

### 2. 安装依赖
```bash
# 依赖已安装，如需重新安装：
npm install
```

### 3. 配置环境变量
```bash
# 复制环境变量模板
cp .env.example .env.local  # 如果没有.example文件，直接编辑.env.local

# 编辑.env.local，填入以下值：
OPENAI_API_KEY=sk-your-openai-key-here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
STRIPE_PRICE_ID=price_your_price_id_here
```

### 4. 启动开发服务器
```bash
npm run dev
# 访问 http://localhost:3000
```

## 📁 项目架构

### 文件结构
```
tweetspark/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局（已配置）
│   ├── page.tsx           # 首页主组件（已创建）
│   ├── api/               # API路由
│   │   └── generate/      # 生成API（已创建）
│   │       └── route.ts
│   └── globals.css        # 全局样式
├── components/            # React组件
│   ├── TopicInput.tsx     # 主题输入（已创建）
│   ├── TweetResults.tsx   # 结果展示（已创建）
│   ├── UpgradeButton.tsx  # 升级按钮（已创建）
│   └── LoadingSpinner.tsx # 加载动画（已创建）
├── lib/                   # 工具函数
│   ├── openai.ts          # OpenAI封装（已创建）
│   ├── supabase.ts        # 数据库客户端（已创建）
│   ├── stripe.ts          # Stripe配置（已创建）
│   └── rate-limit.ts      # API限流（已创建）
└── types/                 # TypeScript类型
    └── index.ts           # 类型定义（已创建）
```

## 🔧 核心模块说明

### 1. OpenAI集成 (`lib/openai.ts`)
```typescript
// 核心函数：generateTweetIdeas
// 输入：主题字符串
// 输出：推文字符串数组
// 特点：专门为出海创业者优化的prompt
```

**Prompt工程要点**：
- 系统提示：强调"出海创业者"、"高转化"、"可立即发布"
- 温度：0.8（平衡创意和相关性）
- 最大token：500（控制成本）

### 2. API路由 (`app/api/generate/route.ts`)
```typescript
// 处理流程：
// 1. 限流检查（基于IP，10次/小时）
// 2. 输入验证
// 3. 使用限制检查（免费用户3次/天）
// 4. 调用OpenAI生成
// 5. 更新使用计数
// 6. 返回结果
```

**错误处理**：
- 400：无效输入
- 429：请求过于频繁
- 402：免费次数用完
- 500：服务器错误
- 503：OpenAI服务不可用

### 3. 前端状态管理
```typescript
// 使用React useState管理：
// - tweets: 生成的推文列表
// - isLoading: 加载状态
// - error: 错误信息
// - usageCount: 使用次数
// - isPremium: 是否高级用户
```

**本地存储策略**：
- `tweetspark_favorites`: 收藏的推文
- `tweetspark_usage_count`: 使用次数
- `tweetspark_premium`: 高级用户标记

## 🎨 UI组件说明

### TopicInput组件
- 输入框 + 生成按钮
- 热门主题建议标签
- 禁用状态处理
- 回车提交支持

### TweetResults组件
- 推文卡片展示（模仿Twitter UI）
- 复制功能（clipboard API）
- 收藏功能（localStorage）
- 标签提取和展示
- 加载状态骨架屏

### UpgradeButton组件
- 使用次数进度条
- Stripe Checkout链接
- 响应式设计
- hover效果

## ⚡ 性能优化

### 1. API响应优化
- 流式响应（未来）
- 缓存策略（未来）
- 压缩传输

### 2. 前端优化
- 图片懒加载
- 组件代码分割
- 状态持久化

### 3. 成本控制
- OpenAI使用GPT-4o-mini（最便宜）
- 免费用户限制3次/天
- API限流防止滥用

## 🔒 安全考虑

### 1. API安全
- 环境变量存储密钥
- IP限流防止滥用
- CORS配置
- 输入验证和清理

### 2. 用户数据
- localStorage数据加密（未来）
- 不存储敏感信息
- 隐私政策声明

### 3. 支付安全
- Stripe处理所有支付信息
- 不存储信用卡信息
- HTTPS强制

## 🐛 调试指南

### 常见问题
1. **OpenAI API错误**
   - 检查API密钥是否正确
   - 检查账户余额
   - 检查网络连接

2. **Supabase连接错误**
   - 检查URL和Anon Key
   - 检查网络连接
   - 检查表结构

3. **Stripe链接无效**
   - 检查Price ID格式
   - 检查产品是否激活
   - 测试环境使用test链接

### 开发工具
```bash
# 查看日志
npm run dev  # 控制台查看

# 构建检查
npm run build  # 检查构建错误

# 类型检查
npx tsc --noEmit  # TypeScript检查
```

## 🚢 部署流程

### Vercel部署（推荐）
1. 推送代码到GitHub
2. Vercel导入项目
3. 配置环境变量
4. 点击部署（2分钟完成）

### 环境变量配置
```bash
# Vercel环境变量
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
STRIPE_PRICE_ID=price_...
NODE_ENV=production
```

### 域名配置（可选）
1. Vercel项目设置 → Domains
2. 添加自定义域名
3. 配置DNS记录

## 📊 监控和维护

### 关键指标
1. **用户活跃**：每日生成次数
2. **转化率**：免费→付费转化
3. **收入**：MRR（月度经常性收入）
4. **成本**：OpenAI API费用
5. **错误率**：API错误比例

### 监控工具
- Vercel Analytics（基础监控）
- Sentry（错误监控）
- Stripe Dashboard（收入监控）
- Supabase Dashboard（数据库监控）

## 🔄 迭代计划

### 第一阶段（上线后1周）
1. 用户反馈收集
2. 基础bug修复
3. 性能优化

### 第二阶段（1-2周）
1. 用户登录系统
2. 内容收藏管理
3. 更多主题模板

### 第三阶段（3-4周）
1. 批量生成功能
2. 内容排期
3. 分析报告

---

## ⏰ 时间分配建议（8小时）

| 时间段 | 任务 | 预计时间 |
|--------|------|----------|
| 0-1h | 环境搭建 + 基础框架 | 1小时 |
| 1-3h | OpenAI集成 + API路由 | 2小时 |
| 3-5h | 核心组件开发 | 2小时 |
| 5-6h | UI优化 + 样式 | 1小时 |
| 6-7h | 测试 + 调试 | 1小时 |
| 7-8h | 文档 + 部署准备 | 1小时 |

**阿码的建议**：
> 不要追求完美代码，追求可运行代码。  
> 先让功能跑起来，再考虑优化。  
> 遇到难题先绕过去，用最简单的方法解决。  
> **8小时后必须有一个可访问的URL。**

*文档版本：v1.0 | 最后更新：2024-03-23*