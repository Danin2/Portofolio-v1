import React from 'react';
import Link from 'next/link';

// Type definitions untuk props
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  // Base styles yang selalu ada
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-custom focus-custom rounded-lg';

  // Variant styles
  const variantStyles = {
    primary: 'bg-accent-blue text-white hover:bg-blue-600 active:bg-blue-700',
    secondary: 'bg-bg-tertiary text-text-primary hover:bg-bg-tertiary/80',
    outline: 'border-2 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  };

  // Disabled styles
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  // Combine all styles
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

  // Jika ada href, render as Link
  if (href && !disabled) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  // Default render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
    >
      {children}
    </button>
  );
};

export default Button;