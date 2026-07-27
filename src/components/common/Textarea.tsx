import React from 'react';
import { cn } from '@/utils/helpers';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  characterCount?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helpText,
  characterCount = false,
  className,
  id,
  maxLength,
  value,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const currentLength = typeof value === 'string' ? value.length : 0;

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
      <textarea
        id={inputId}
        className={cn(
          'textarea-field',
          error ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]' : '',
          className
        )}
        maxLength={maxLength}
        value={value}
        {...props}
      />
      <div className="flex justify-between items-center mt-1">
        <div>
          {error && (
            <p className="text-[#EF4444] text-sm">{error}</p>
          )}
          {helpText && !error && (
            <p className="text-gray-400 text-sm">{helpText}</p>
          )}
        </div>
        {characterCount && maxLength && (
          <p className="text-gray-400 text-sm">
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};
