'use client';

import { useState, useEffect } from 'react';
import TopicInput from '@/components/TopicInput';
import TweetResults from '@/components/TweetResults';
import UpgradeButton from '@/components/UpgradeButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getUsageCount, isUserPremium } from '@/lib/stripe';

export default function Home() {
  const [tweets, setTweets] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState('');
  const [usageCount, setUsageCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);

  // 初始化用户状态
  useEffect(() => {
    setUsageCount(getUsageCount());
    setIsPremium(isUserPremium());
  }, []);

  const handleGenerate = async (topic: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentTopic(topic);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '生成失败');
      }
      
      if (data.success) {
        setTweets(data.tweets);
        setUsageCount(data.usageCount);
        setIsPremium(data.isPremium);
      } else {
        throw new Error(data.error || '生成失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知错误');
      setTweets([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 导航栏 */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold text-gray-900">TweetSpark</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/yourusername/tweetspark" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <UpgradeButton />
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 头部 */}
        <header className="text-center py-8 md:py-12">
          <h1 className="text-4xl md:text1-6xl font-bold text-gray-900 mb-4">
            为独立出海创业者生成
            <span className="block text-blue-600 mt-2">高转化推文灵感</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            输入你的创业主题，AI将在10秒内生成可立即发布的推文内容
            <span className="block text-sm text-gray-400 mt-2">
              专为出海创业者优化 • 支持一键复制 • 免费试用
            </span>
          </p>
        </header>

        {/* 主输入区 */}
        <section className="mb-12 py-8">
          <TopicInput onGenerate={handleGenerate} isLoading={isLoading} />
        </section>

        {/* 结果展示 */}
        <section className="mb-12">
          {error && (
            <div className="max-w-2xl mx-auto mb-6">
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">生成失败</span>
                </div>
                <p className="mt-2">{error}</p>
                {error.includes('免费次数') && (
                  <a 
                    href="https://buy.stripe.com/test_00g5lL5Hr2t8dxa6oo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    立即升级
                  </a>
                )}
              </div>
            </div>
          )}
          
          <TweetResults 
            tweets={tweets} 
            isLoading={isLoading}
            topic={currentTopic}
          />
        </section>

        {/* 功能说明 */}
        <section className="mt-16 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">为什么选择 TweetSpark？</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">精准定位</h3>
              <p className="text-gray-600">专为出海创业者优化，理解你的目标受众和行业痛点</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-600 text-2xl">⚡️</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">快速生成</h3>
              <p className="text-gray-600">3秒内获得可立即发布的推文灵感，节省内容创作时间</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-purple-600 text-2xl">💾</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">一键收藏</h3>
              <p className="text-gray-600">保存你喜欢的灵感，建立个人内容库，随时查看和使用</p>
            </div>
          </div>
        </section>

        {/* Build in Public 板块 */}
        <section className="mt-16 mb-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">#BuildInPublic</h2>
            <p className="text-lg mb-6 opacity-90">
              这个项目正在公开构建中！关注我们的开发进度、用户反馈和迭代过程。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full font-medium transition-colors"
              >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter更新
                </span>
              </a>
              <a 
                href="https://github.com/yourusername/tweetspark" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full font-medium transition-colors"
              >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.12 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub代码
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* 页脚 */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold text-gray-900">TweetSpark</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                © 2024 为出海创业者打造的AI内容工具
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-900">隐私政策</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">服务条款</a>
              <a href="mailto:contact@tweetspark.com" className="text-gray-500 hover:text-gray-900">联系我们</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}