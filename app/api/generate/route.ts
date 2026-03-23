import { NextRequest, NextResponse } from 'next/server';
import { generateTweetIdeas } from '@/lib/openai';
import { rateLimit } from '@/lib/rate-limit';
import { incrementUsageCount, isUserPremium, getUsageCount } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    // 简单的API限流（基于IP）
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'anonymous';
    const isAllowed = await rateLimit(ip, 10); // 10次/小时
    
    if (!isAllowed) {
      return NextResponse.json(
        { 
          success: false,
          error: '请求过于频繁，请稍后再试' 
        },
        { status: 429 }
      );
    }

    const { topic } = await request.json();
    
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: '请输入有效的主题' 
        },
        { status: 400 }
      );
    }

    // 检查用户使用限制（简化版）
    const premium = false; // 临时关闭付费检查
    const usage = getUsageCount();
    
    // 如果是免费用户且超过3次，返回限制提示
    if (!premium && usage >= 3) {
      return NextResponse.json(
        {
          success: false,
          error: '免费次数已用完，请升级到高级版',
          usageCount: usage,
          isPremium: false,
          limitReached: true
        },
        { status: 402 }
      );
    }

    // 生成推文
    const tweets = await generateTweetIdeas(topic.trim());
    
    // 增加使用计数
    incrementUsageCount();
    
    return NextResponse.json({ 
      success: true,
      tweets,
      usageCount: usage + 1,
      isPremium: premium
    });
    
  } catch (error) {
    console.error('Generation error:', error);
    
    // 如果是OpenAI API错误，提供友好的错误信息
    if (error instanceof Error && error.message.includes('OpenAI API')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'AI服务暂时不可用，请稍后重试' 
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: '生成失败，请稍后重试' 
      },
      { status: 500 }
    );
  }
}

// 添加OPTIONS方法支持CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}