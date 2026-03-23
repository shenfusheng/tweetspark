// Stripe配置（MVP版本）
// 使用Checkout链接，无需复杂集成

export const STRIPE_CONFIG = {
  priceId: process.env.STRIPE_PRICE_ID || 'price_your_price_id_here',
  checkoutUrl: `https://buy.stripe.com/checkout/${process.env.STRIPE_PRICE_ID || 'test'}`,
};

// 获取升级链接
export function getUpgradeUrl(): string {
  // 如果是测试环境，返回测试链接
  if (process.env.NODE_ENV === 'development') {
    return 'https://buy.stripe.com/test_00g5lL5Hr2t8dxa6oo';
  }
  
  return STRIPE_CONFIG.checkoutUrl;
}

// 检查用户是否已付费（简化版本）
export function isUserPremium(): boolean {
  if (typeof window === 'undefined') return false;
  
  // MVP: 检查localStorage中的标记
  const premiumStatus = localStorage.getItem('tweetspark_premium');
  return premiumStatus === 'true';
}

// 标记用户为付费用户
export function markUserAsPremium() {
  if (typeof window === 'undefined') return;
  localStorage.setItem('tweetspark_premium', 'true');
}

// 检查使用次数
export function getUsageCount(): number {
  if (typeof window === 'undefined') return 0;
  
  const usage = localStorage.getItem('tweetspark_usage_count');
  return parseInt(usage || '0', 10);
}

export function incrementUsageCount() {
  if (typeof window === 'undefined') return;
  
  const current = getUsageCount();
  localStorage.setItem('tweetspark_usage_count', (current + 1).toString());
  
  // 如果是免费用户且超过3次，提示升级
  if (!isUserPremium() && current + 1 >= 3) {
    console.log('免费次数已用完，请升级到高级版');
  }
}