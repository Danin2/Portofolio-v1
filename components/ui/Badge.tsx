import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium';

  const variantStyles = {
    default: 'bg-bg-tertiary text-text-secondary',
    success: 'bg-accent-green/10 text-accent-green border border-accent-green/20',
    warning: 'bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/20',
    error: 'bg-accent-red/10 text-accent-red border border-accent-red/20',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <span className={combinedStyles}>
      {children}
    </span>
  );
};

export default Badge;