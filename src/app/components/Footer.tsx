import { Reveal } from '@/app/components/Reveal';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--paper-2)] mt-16 md:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <Reveal>
          <blockquote className="text-center mb-10">
            <p className="font-display text-2xl md:text-3xl font-medium leading-snug text-[var(--ink)] max-w-3xl mx-auto">
              “Twenty years from now you will be more disappointed by the things that you
              didn't do than by the ones you did do.”
            </p>
            <cite className="mt-4 block text-sm not-italic uppercase tracking-[0.2em] text-[var(--ink-faint)]">
              - H. Jackson Brown Jr.
            </cite>
          </blockquote>
        </Reveal>

        <div className="flex flex-col items-center gap-2 text-sm text-[var(--ink-faint)]">
          <span className="text-[var(--accent)]">&#10022;</span>
          <span>© Swathi Saravanan {currentYear}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
