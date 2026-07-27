import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message = 'Loading...',
  fullScreen = false,
}) => {
  const sizeClass = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }[size];

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizeClass} border-4 border-gray-700 border-t-[#7CFF00] rounded-full animate-spin`} />
      {message && <p className="text-gray-300">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        {content}
      </div>
    );
  }

  return content;
};
