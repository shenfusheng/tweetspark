// 简单的内存限流（MVP版本）
// 生产环境应该使用Redis或数据库

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export async function rateLimit(identifier: string, limit: number = 10, windowMs: number = 3600000): Promise<boolean> {
  const now = Date.now();
  const key = `rate_limit:${identifier}`;
  
  let record = rateLimitStore.get(key);
  
  if (!record || now > record.resetTime) {
    // 新窗口或窗口已过期
    record = { count: 1, resetTime: now + windowMs };
    rateLimitStore.set(key, record);
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  rateLimitStore.set(key, record);
  return true;
}

// 清理过期记录
function cleanupExpiredRecords() {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// 每5分钟清理一次
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredRecords, 300000);
}