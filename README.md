# TweetSpark - AI推文灵感生成器

> 🚀 **24小时MVP挑战项目** - 专为出海创业者打造的内容创作工具

## 📋 项目概述

TweetSpark是一个AI驱动的推文灵感生成器，帮助独立出海创业者在10秒内生成高转化的推特内容。项目采用极简MVP理念，目标在24小时内完成开发、部署并获取第一批用户。

**核心价值**：解决出海创业者"脑子空"的内容创作痛点，节省内容创作时间。

## 🎯 功能特性

### MVP版本（极简核心）
- ✅ **主题输入**：单行文本框 + 热门主题建议标签
- ✅ **AI生成**：OpenAI GPT-4o-mini生成3-5条推文
- ✅ **结果交互**：一键复制 + localStorage收藏
- ✅ **使用限制**：免费用户3次/天，高级版无限
- ✅ **响应式设计**：桌面端和移动端适配

### 技术栈
- **前端**：Next.js 14 (App Router) + TypeScript
- **样式**：Tailwind CSS v4
- **后端**：Next.js API Routes (Serverless)
- **数据库**：Supabase (PostgreSQL)
- **AI服务**：OpenAI GPT-4o-mini API
- **支付**：Stripe Checkout链接
- **部署**：Vercel

## 🚀 快速开始

### 环境要求
- Node.js 18+
- OpenAI API密钥
- Supabase账号（免费层）
- Stripe账号（测试环境）

### 开发环境
```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑.env.local填入API密钥

# 启动开发服务器
npm run dev
# 访问 http://localhost:3000
```

### 部署到Vercel
1. 推送代码到GitHub仓库
2. Vercel导入项目
3. 配置环境变量
4. 点击部署（2分钟完成）

## 📁 项目结构

```
tweetspark/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页主组件
│   └── api/               # API路由
├── components/            # React组件
│   ├── TopicInput.tsx     # 主题输入组件
│   ├── TweetResults.tsx   # 推文展示组件
│   ├── UpgradeButton.tsx  # 升级按钮组件
│   └── LoadingSpinner.tsx # 加载动画组件
├── lib/                   # 工具函数
│   ├── openai.ts          # OpenAI封装
│   ├── supabase.ts        # Supabase客户端
│   ├── stripe.ts          # Stripe配置
│   └── rate-limit.ts      # API限流
└── types/                 # TypeScript类型定义
```

## 📊 商业模型

### 免费版
- 3次生成/天
- 基础主题支持
- localStorage收藏

### 高级版 ($5/月)
- 无限生成
- 高级主题模板
- 批量导出功能
- 优先支持

### 验证指标
- **成功标准**：$50月收入（10个付费用户）
- **失败标准**：24小时后无用户或无付费意向 → 立即停止项目

## 🔧 开发指南

详细开发文档请参考：
- [TweetSpark_MVP_项目文档.md](./TweetSpark_MVP_项目文档.md) - 产品需求和商业计划
- [TweetSpark_工程师启动指南.md](./TweetSpark_工程师启动指南.md) - 技术实现和部署指南

## 📈 后续迭代

如果MVP验证成功：
1. 用户登录系统（Supabase Auth）
2. 内容收藏管理
3. 更多主题模板
4. 批量生成功能
5. 分析报告

## 👥 贡献

这是一个#BuildInPublic项目，欢迎关注开发进度：
- **GitHub**：[yourusername/tweetspark](https://github.com/yourusername/tweetspark)
- **Twitter**：使用 #TweetSpark #BuildInPublic 标签

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件
