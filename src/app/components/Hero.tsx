import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const rotatingWords = ['adventure', 'art', 'music', 'musings', 'ideas', 'explorations'];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const scrollToBuilds = () => {
    const el = document.getElementById('builds');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section
      id="sidequests"
      aria-label="Netravati Peak - mountains and the calm they bring"
      className="relative min-h-[92vh] w-full overflow-hidden bg-[var(--paper)]"
    >
      {/* Full-bleed hero image (background so a broken URL never shows alt text) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://itaesahinwgttopvkkip.supabase.co/storage/v1/object/public/SideQuest_Carousel/Netravati.jpg')",
        }}
      >
        {/* Cinematic dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--paper)] via-[var(--paper)]/40 to-[var(--paper)]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--paper)]/85 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 pt-24 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[var(--accent)]"
        >
          <span className="h-px w-10 bg-[var(--accent)]" />
          The personal site of Swathi Saravanan
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl font-bold uppercase leading-[0.92] tracking-tight text-[var(--ink)] md:text-7xl lg:text-8xl"
        >
          Side<span className="text-[var(--accent)]">quests</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)] md:text-xl"
        >
          Field notes from the detours, and everything worth the wander. A place for{' '}
          <span className="inline-flex h-[1.3em] items-end overflow-hidden align-bottom">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={rotatingWords[wordIndex]}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="whitespace-nowrap font-semibold text-[var(--accent)]"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={scrollToBuilds}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(242,106,44,0.6)] transition-all duration-300 hover:bg-[var(--accent-deep)] hover:shadow-[0_14px_36px_-8px_rgba(242,106,44,0.7)]"
          >
            Explore the builds
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
          <a
            href="https://swathisarav.github.io/portfolio/"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-[var(--ink-soft)] underline-offset-4 transition-colors hover:text-[var(--ink)] hover:underline"
          >
            View portfolio
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-[var(--ink-faint)] pt-2"
        >
          <span className="h-1.5 w-1 rounded-full bg-[var(--accent)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
