'use client';

import { useState } from 'react';
import { addFavorite } from '@/lib/supabase';

interface TweetResultsProps {
  tweets: string[];
  isLoading: boolean;
  topic: string;
}

export default function TweetResults({ tweets, isLoading, topic }: TweetResultsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const handleFavorite = async (tweetText: string, index: number) => {
    try {
      await addFavorite(tweetText, topic);
      setFavorites(prev => new Set(prev).add(index));
    } catch (err) {
      console.error('收藏失败:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tweets.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">等待生成推文灵感</h3>
        <p className="text-gray-400">输入主题后点击"生成灵感"按钮开始</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">为你生成的推文灵感</h2>
        <p className="text-gray-500 mt-1">主题：{topic}</p>
      </div>
      
      <div className="space-y-4">
        {tweets.map((tweet, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">T</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">TweetSpark</div>
                  <div className="text-gray-400 text-sm">@tweetspark_ai</div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleFavorite(tweet, index)}
                  className={`p-2 rounded-full ${favorites.has(index) ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                  title="收藏"
                >
                  <svg className="w-5 h-5" fill={favorites.has(index) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={favorites.has(index) ? "0" : "1.5"} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                
                <button
                  onClick={() => handleCopy(tweet, index)}
                  className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50"
                  title="复制"
                >
                  {copiedIndex === index ? (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <p className="text-gray-800 text-lg mb-4 whitespace-pre-line">{tweet}</p>
            
            <div className="flex flex-wrap gap-2">
              {tweet.match(/#\w+/g)?.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm text-gray-400">
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span>{tweet.length}/280 字符</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-blue-700 text-sm">
            提示：点击推文右上角的图标可以收藏或复制内容。免费用户每天可生成3次，升级高级版无限制。
          </p>
        </div>
      </div>
    </div>
  );
}