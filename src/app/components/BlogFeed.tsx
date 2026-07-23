import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Reveal } from '@/app/components/Reveal';

interface BlogPost {
  id: string;
  title: string;
  date?: string;
  content: React.ReactNode;
  image?: string;
  video?: string;
  /** Placeholder posts get the playful "brewing" treatment */
  placeholder?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Something is brewing',
    date: 'Coming soon',
    placeholder: true,
    content: (
      <p>
        The first field notes are still steeping. Essays, experiments, and the odd
        unfinished thought will land here - check back soon.
      </p>
    ),
    image:
      'https://images.unsplash.com/photo-1505209487757-5114235191e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd29ya3NwYWNlJTIwZGVzayUyMGxhcHRvcHxlbnwxfHx8fDE3Njk3NjA4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function BlogFeed() {
  return (
    <div>
      <Reveal>
        <div className="mb-8 flex items-baseline gap-3">
          <span className="font-display text-sm font-semibold text-[var(--accent)]">01</span>
          <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-[var(--ink)] md:text-3xl">
            Field Notes
          </h2>
          <span className="mb-1 flex-1 border-b border-dashed border-[var(--line)]" />
        </div>
      </Reveal>

      <div className="space-y-8 md:space-y-10">
        {blogPosts.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.08}>
            <article className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)]">
              {post.date && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
                    {post.placeholder && (
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                      </span>
                    )}
                    {post.date}
                  </span>
                </div>
              )}

              <h3 className="font-display text-2xl font-semibold md:text-3xl text-[var(--ink)] mb-3">
                {post.title}
              </h3>

              <div className="text-[var(--ink-soft)] leading-relaxed mb-6">
                {post.content}
              </div>

              {post.image && (
                <div className="overflow-hidden rounded-xl">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
