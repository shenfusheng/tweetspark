'use client';

import { useState } from 'react';

const SUGGESTED_TOPICS = [
  '出海 SaaS',
  'Indie Hacker',
  '远程工作',
  '产品定价',
  '用户增长',
  '技术栈选择',
  '创业融资',
  '产品营销',
  '内容创作',
  '社区建设'
];

interface TopicInputProps {
  onGenerate: (topic: string) => void;
  isLoading: boolean;
}

export default function TopicInput({ onGenerate, isLoading }: TopicInputProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onGenerate(topic.trim());
    }
  };

  const handleSuggestedClick = (suggestedTopic: string) => {
    setTopic(suggestedTopic);
    onGenerate(suggestedTopic);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="输入你的创业主题，例如：如何为SaaS产品定价..."
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!topic.trim() || isLoading}
            className="absolute right-2 top-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '生成中...' : '生成灵感'}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="text-gray-500 text-sm mr-2">试试这些主题：</span>
          {SUGGESTED_TOPICS.map((suggested) => (
            <button
              key={suggested}
              type="button"
              onClick={() => handleSuggestedClick(suggested)}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
              disabled={isLoading}
            >
              {suggested}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}