'use client';

import { motion, Variants } from 'framer-motion';

interface StaggeredTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export default function StaggeredText({ text, className = '', style, delay = 0 }: StaggeredTextProps) {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay }
    }
  };

  const word: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      style={style}
    >
      {text.split(' ').map((w, i) => (
        <motion.span key={`${w}-${i}`} variants={word} className="inline-block mr-[0.25em] last:mr-0">
          {w}
        </motion.span>
      ))}
    </motion.div>
  );
}
