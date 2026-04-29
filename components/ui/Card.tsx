import React from 'react';

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  hover = false,
  className = '',
  onClick,
}) => {
  const baseStyles = 'card-base p-6 transition-custom';
  const hoverStyles = hover ? 'hover:border-accent-blue/50 hover:shadow-lg hover:shadow-accent-blue/10 cursor-pointer' : '';
  const combinedStyles = `${baseStyles} ${hoverStyles} ${className}`;

  return (
    <div className={combinedStyles} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;