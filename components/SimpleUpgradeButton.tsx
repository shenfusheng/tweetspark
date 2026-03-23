'use client';

import { getUpgradeUrl, isUserPremium } from '@/lib/stripe';

export default function SimpleUpgradeButton() {
  const isPremium = isUserPremium();
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

  return (
    <a
      href={upgradeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-colors"
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      升级
    </a>
  );
}