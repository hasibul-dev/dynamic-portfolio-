import React from 'react';
import { cn } from '@/utils/helpers';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ hoverable = false, className, ...props }) => {
  return (
    <div
      className={cn(
        hoverable ? 'card-hover' : 'card',
        className
      )}
      {...props}
    />
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  description,
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('pb-4 border-b border-[#111111]', className)} {...props}>
      {children}
      {title && <h3 className="text-xl font-semibold">{title}</h3>}
      {description && <p className="text-gray-400 text-sm mt-1">{description}</p>}
    </div>
  );
};

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('py-4', className)} {...props}>
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('pt-4 border-t border-[#111111] flex justify-end gap-2', className)} {...props}>
      {children}
    </div>
  );
};
