import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateTweetIdeas(topic: string): Promise<string[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `你是一个帮助独立出海创业者生成推特内容的专家。生成3-5条简短、有洞察力、可立即发布的推文。
每条推文不超过280字符，包含相关标签。
风格：直接、有价值、带点个人色彩。
针对主题：${topic}，生成适合出海创业者的推文。`
        },
        {
          role: "user",
          content: `请为以下主题生成推特灵感：${topic}`
        }
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    // 解析返回的文本为数组
    const content = completion.choices[0]?.message?.content || '';
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    
    // 确保返回3-5条推文
    return lines.slice(0, 5);
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('生成失败，请稍后重试');
  }
}