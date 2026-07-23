import { Reveal } from '@/app/components/Reveal';

export function WritingSection() {
  return (
    <section id="writing" className="scroll-mt-20 py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-8 flex items-baseline gap-3">
            <span className="font-display text-sm text-[var(--accent)]">✦</span>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--ink)]">Writing</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6">
            <h3 className="font-display text-xl text-[var(--ink)] mb-3">
              The Art of Strategic Patience
            </h3>
            <p className="text-[var(--ink-soft)] mb-4">
              In a world that rewards speed, knowing when to slow down is a competitive
              advantage. Strategic patience isn't about waiting - it's about timing.
            </p>
            <span className="modern-link">Read more →</span>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6">
            <h3 className="font-display text-xl text-[var(--ink)] mb-3">
              Systems Thinking for Startups
            </h3>
            <p className="text-[var(--ink-soft)] mb-4">
              Building a company is about creating interconnected systems that reinforce
              each other. Here's how to think in loops, not lines.
            </p>
            <span className="modern-link">Read more →</span>
          </div>
        </div>
      </div>
    </section>
  );
}

interface Build {
  emoji: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

const builds: Build[] = [
  {
    emoji: '🎸',
    title: 'Guitar Log',
    description: 'A tool to plan and track your guitar practice.',
    href: 'https://guitar-ilemnite.base44.app',
    cta: 'Open it',
  },
];

export function BuildsSection() {
  return (
    <section
      id="builds"
      className="scroll-mt-20 py-16 md:py-24 px-4 sm:px-6 bg-[var(--paper-2)] border-y border-[var(--line)]"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-display text-sm font-semibold text-[var(--accent)]">03</span>
            <h2 className="font-display text-3xl font-semibold uppercase tracking-tight text-[var(--ink)] md:text-4xl">
              Builds
            </h2>
          </div>
          <p className="mb-10 max-w-xl text-[var(--ink-soft)]">
            Little things I've made - half experiment, half excuse to learn something new.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {builds.map((build, i) => (
            <Reveal key={build.title} delay={i * 0.08}>
              <a
                href={build.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  {build.emoji}
                </div>
                <h3 className="font-display text-lg font-semibold text-[var(--ink)] mb-2">{build.title}</h3>
                <p className="text-sm text-[var(--ink-soft)] flex-1">{build.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)]">
                  {build.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-8 flex items-baseline gap-3">
            <span className="font-display text-sm font-semibold text-[var(--accent)]">04</span>
            <h2 className="font-display text-3xl font-semibold uppercase tracking-tight text-[var(--ink)] md:text-4xl">
              About
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="max-w-3xl">
            <p className="font-display text-2xl md:text-3xl font-medium leading-snug text-[var(--ink)] mb-6">
              Hi, I'm Swathi - I write about my adventures and ideas, and collect the
              small wonders along the way.
            </p>
            <p className="text-lg text-[var(--ink-soft)]">
              You can find my portfolio{' '}
              <a href="https://swathisarav.github.io/portfolio/" className="modern-link">
                here
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
