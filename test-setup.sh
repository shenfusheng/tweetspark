#!/bin/bash

echo "=== TweetSpark 项目设置测试 ==="
echo ""

# 检查Node.js版本
echo "1. 检查Node.js版本..."
node --version
if [ $? -ne 0 ]; then
    echo "❌ Node.js未安装或不在PATH中"
    exit 1
fi
echo "✅ Node.js已安装"

# 检查npm包
echo ""
echo "2. 检查依赖包..."
npm list --depth=0 | grep -E "(next|react|openai|supabase|stripe|tailwind)"
if [ $? -ne 0 ]; then
    echo "❌ 依赖包未正确安装"
    echo "请运行: npm install"
    exit 1
fi
echo "✅ 依赖包已安装"

# 检查关键文件
echo ""
echo "3. 检查关键文件..."
files=("app/layout.tsx" "app/page.tsx" "lib/openai.ts" "components/TopicInput.tsx")
for file in "${files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ 缺少文件: $file"
        exit 1
    fi
    echo "✅ $file"
done

# 检查环境变量
echo ""
echo "4. 检查环境变量..."
if [ ! -f ".env.local" ]; then
    echo "⚠️  缺少.env.local文件"
    echo "请复制.env.example或创建.env.local并配置API密钥"
else
    echo "✅ .env.local文件存在"
    # 检查是否包含必要的key
    grep -q "OPENAI_API_KEY" .env.local && echo "✅ OPENAI_API_KEY配置存在"
    grep -q "SUPABASE_URL" .env.local && echo "✅ SUPABASE_URL配置存在"
    grep -q "SUPABASE_ANON_KEY" .env.local && echo "✅ SUPABASE_ANON_KEY配置存在"
fi

# 检查TypeScript编译
echo ""
echo "5. 检查TypeScript编译..."
npx tsc --noEmit --skipLibCheck
if [ $? -ne 0 ]; then
    echo "❌ TypeScript编译错误"
    exit 1
fi
echo "✅ TypeScript编译通过"

# 检查Next.js构建
echo ""
echo "6. 检查Next.js构建..."
npx next build 2>&1 | tail -20
if [ ${PIPESTATUS[0]} -ne 0 ]; then
    echo "❌ Next.js构建失败"
    exit 1
fi
echo "✅ Next.js构建通过"

echo ""
echo "=== 测试完成 ==="
echo "✅ 项目设置正确，可以正常运行"
echo ""
echo "启动开发服务器: npm run dev"
echo "访问: http://localhost:3000"