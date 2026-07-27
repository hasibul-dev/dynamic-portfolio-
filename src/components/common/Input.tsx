import React from 'react';
import { cn } from '@/utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  icon,
  className,
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold mb-2 text-[#D9D9D9]"
        >
          {label}
          {props.required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            'input-field',
            icon ? 'pl-10' : '',
            error ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]' : '',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-[#EF4444] text-sm mt-1">{error}</p>
      )}
      {helpText && !error && (
        <p className="text-gray-400 text-sm mt-1">{helpText}</p>
      )}
    </div>
  );
};
