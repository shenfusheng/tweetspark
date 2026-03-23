# TweetSpark 部署指南

## 🚀 Vercel一键部署

### 方法1：通过GitHub部署（推荐）

1. **推送代码到GitHub**

   ```bash
   # 添加远程仓库
   git remote add origin https://github.com/yourusername/tweetspark.git
   git branch -M main
   git push -u origin main
   ```

2. **Vercel部署**
   - 访问 [vercel.com](https://vercel.com)
   - 使用GitHub账号登录
   - 点击"Import Project"
   - 选择tweetspark仓库
   - 点击"Deploy"（约2分钟完成）

3. **配置环境变量**
   - 进入Vercel项目设置
   - 选择"Environment Variables"
   - 添加以下变量：
     ```
     OPENAI_API_KEY=sk-your-openai-key-here
     SUPABASE_URL=https://your-project.supabase.co
     SUPABASE_ANON_KEY=your-anon-key-here
     STRIPE_PRICE_ID=price_your_price_id_here
     NODE_ENV=production
     ```

### 方法2：Vercel CLI部署

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel --prod
```

## 🌐 自定义域名配置

### 1. 添加域名

- Vercel项目设置 → Domains
- 输入你的域名（如：tweetspark.yourdomain.com）
- 点击"Add"

### 2. 配置DNS记录

根据Vercel提示，在域名注册商处添加CNAME记录：

```
类型: CNAME
名称: tweetspark (或 @ 根域名)
值: cname.vercel-dns.com
TTL: 自动
```

### 3. 等待DNS传播

DNS变更通常需要5-60分钟生效。

## 🔧 环境变量配置

### 必需的环境变量

```env
# OpenAI API (必需)
OPENAI_API_KEY=sk-...

# Supabase配置 (必需)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here

# Stripe配置 (必需)
STRIPE_PRICE_ID=price_...

# 环境标识
NODE_ENV=production
```

### 获取API密钥

1. **OpenAI API密钥**
   - 访问 [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - 创建新密钥
   - 复制到环境变量

2. **Supabase配置**
   - 访问 [supabase.com](https://supabase.com)
   - 创建新项目
   - 获取URL和Anon Key
   - 创建`favorites`表：
     ```sql
     CREATE TABLE favorites (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       user_id UUID REFERENCES auth.users(id),
       tweet_text TEXT NOT NULL,
       topic TEXT NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
     );
     ```

3. **Stripe Price ID**
   - 访问 [dashboard.stripe.com/products](https://dashboard.stripe.com/products)
   - 创建新产品
   - 设置价格$5/月
   - 复制Price ID

## 📊 监控和维护

### 性能监控

- **Vercel Analytics**: 内置性能监控
- **Google Analytics**: 用户行为分析（可选）
- **Sentry**: 错误监控（可选）

### 成本监控

1. **OpenAI成本**
   - 监控API使用量
   - 设置使用限制
   - 费用估算：$0.15/1M tokens

2. **Supabase成本**
   - 免费层：500MB数据库 + 1GB带宽
   - 超过后：$25/月起

3. **Vercel成本**
   - Hobby计划免费
   - 专业功能：$20/月起

### 备份策略

1. **代码备份**: GitHub仓库
2. **数据库备份**: Supabase自动备份
3. **环境变量备份**: 本地保存

## 🔒 安全配置

### HTTPS强制

- Vercel自动启用HTTPS
- 确保所有流量通过HTTPS

### API安全

1. **环境变量保护**
   - 不在代码中硬编码密钥
   - 使用Vercel环境变量

2. **限流保护**
   - 已实现IP限流（10次/小时）
   - 可考虑添加API密钥验证

3. **CORS配置**
   - 当前配置允许所有来源（开发环境）
   - 生产环境应限制来源

### 数据安全

1. **用户数据**
   - 使用localStorage（MVP阶段）
   - 未来迁移到Supabase Auth

2. **支付安全**
   - Stripe处理支付信息
   - 不存储信用卡信息

## 🔄 更新和迭代

### 更新流程

1. **开发环境测试**

   ```bash
   git checkout -b feature/new-feature
   # 开发新功能
   npm run dev
   # 测试功能
   ```

2. **代码审查**

   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   git push origin feature/new-feature
   # 创建Pull Request
   ```

3. **部署到生产**
   - 合并到main分支
   - Vercel自动部署
   - 监控部署状态

### 回滚策略

1. **Vercel回滚**
   - Vercel项目 → Deployments
   - 选择之前的部署
   - 点击"Promote to Production"

2. **Git回滚**
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

## 🐛 故障排除

### 常见问题

1. **部署失败**
   - 检查环境变量是否正确
   - 查看Vercel部署日志
   - 检查TypeScript编译错误

2. **API无法访问**
   - 检查API密钥是否有效
   - 检查网络连接
   - 查看服务器日志

3. **样式异常**
   - 清除浏览器缓存
   - 检查Tailwind CSS配置
   - 验证CSS文件是否正确加载

### 调试工具

```bash
# 查看Vercel日志
vercel logs

# 本地调试
npm run dev
# 访问 http://localhost:3000

# 构建检查
npm run build
```

## 📱 移动端适配

### 已支持的功能

- ✅ 响应式布局
- ✅ 触摸屏优化
- ✅ 移动端导航
- ✅ 加载状态优化

### 测试建议

1. **设备测试**
   - iPhone Safari
   - Android Chrome
   - iPad Safari

2. **网络条件**
   - 3G网络模拟
   - 离线状态
   - 弱网环境

## 🌍 国际化支持（未来）

### 计划支持的语言

1. **英语** (默认)
2. **中文** (未来)
3. **西班牙语** (未来)

### 国际化策略

- 使用next-intl库
- 按需加载翻译文件
- 用户语言自动检测

---

## 🎯 上线检查清单

### 部署前检查

- [ ] 代码已推送到GitHub
- [ ] 环境变量已配置
- [ ] TypeScript编译通过
- [ ] Next.js构建成功
- [ ] 基本功能测试通过

### 部署后检查

- [ ] 网站可访问
- [ ] API正常工作
- [ ] 移动端适配正常
- [ ] HTTPS强制启用
- [ ] 监控工具配置

### 上线后行动

- [ ] 在IndieHackers发布
- [ ] Twitter分享#BuildInPublic
- [ ] 收集用户反馈
- [ ] 监控关键指标

---

**部署成功标志**：用户可以通过公开URL访问TweetSpark，并成功生成推文灵感。
