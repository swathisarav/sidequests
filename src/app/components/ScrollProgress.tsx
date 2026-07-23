import { motion, useScroll, useSpring } from 'motion/react';

/** A thin terracotta bar at the very top that tracks reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
    >
      <div className="h-full w-full bg-[var(--accent)]" />
    </motion.div>
  );
}
