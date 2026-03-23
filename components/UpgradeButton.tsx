'use client';

import { getUpgradeUrl, isUserPremium, getUsageCount } from '@/lib/stripe';
import { useState } from 'react';

export default function UpgradeButton() {
  const [isHovered, setIsHovered] = useState(false);
  const isPremium = isUserPremium();
  const usageCount = getUsageCount();
  const upgradeUrl = getUpgradeUrl();

  if (isPremium) {
    return (
      <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        高级版用户
      </div>
    );
  }

  const remainingUses = Math.max(0, 3 - usageCount);

  return (
    <div className="text-center">
      <a
        href={upgradeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        升级高级版
        {isHovered && (
          <span className="ml-2 text-sm bg-white/20 px-2 py-1 rounded-full">
            $5/月
          </span>
        )}
      </a>
      
      <div className="mt-3 text-sm text-gray-600">
        <div className="flex items-center justify-center">
          <div className="w-48 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(usageCount / 3) * 100}%` }}
            ></div>
          </div>
          <span className="ml-3 font-medium">
            {remainingUses} 次免费生成剩余
          </span>
        </div>
        
        <div className="mt-2 grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-gray-400 text-xs">免费版</div>
            <div className="font-medium">3次/天</div>
            <div className="text-gray-500 text-xs">基础功能</div>
          </div>
          <div className="text-center border-l border-gray-200">
            <div className="text-blue-600 text-xs">高级版</div>
            <div className="font-medium">无限生成</div>
            <div className="text-gray-500 text-xs">+高级模板</div>
          </div>
        </div>
      </div>
    </div>
  );
}