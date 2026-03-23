'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-2 border-gray-200 rounded-full`}></div>
        <div className={`${sizeClasses[size]} border-2 border-blue-500 border-t-transparent rounded-full absolute top-0 left-0 animate-spin`}></div>
      </div>
      {text && (
        <p className="mt-3 text-gray-500 text-sm font-medium">{text}</p>
      )}
    </div>
  );
}