import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds before the reveal starts */
  delay?: number;
  /** How far (px) it travels up into place */
  y?: number;
  className?: string;
}

/**
 * Fades + slides its children into place the first time they scroll into view.
 * Kept intentionally subtle so the site stays calm and editorial.
 */
export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
