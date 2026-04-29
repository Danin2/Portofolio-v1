'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface FallingLettersProps {
  text: string;
  delay?: number;
  className?: string;
  trigger?: boolean;
}

const FallingLetters: React.FC<FallingLettersProps> = ({ 
  text, 
  delay = 0, 
  className = "",
  trigger = true 
}) => {
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      style={{ display: 'flex', overflow: 'hidden' }}
      variants={container}
      initial="hidden"
      animate={trigger ? "visible" : "hidden"}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block' }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default FallingLetters;
