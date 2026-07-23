import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface VisualPost {
  id: string;
  image: string;
  caption?: string;
  tag?: string;
}

const visualPosts: VisualPost[] = [
  {
    id: '1',
    image:
      'https://itaesahinwgttopvkkip.supabase.co/storage/v1/object/public/SideQuest_Carousel/netravati_me.png',
    tag: 'Trek',
    caption: 'Somewhere up high.',
  },
  {
    id: '2',
    image:
      'https://itaesahinwgttopvkkip.supabase.co/storage/v1/object/public/SideQuest_Carousel/Netravati.jpg',
    tag: 'Peak',
    caption: 'Netravati Peak - mountains & the calm they bring.',
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1711185896337-ee0ca611c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcmVhZGluZyUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3Njk3NjA4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tag: 'Read',
    caption: 'Current read.',
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1766869379184-c85fa64eb4ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZHMlMjBza3klMjBwZWFjZWZ1bHxlbnwxfHx8fDE3Njk3NjA4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tag: 'Sky',
    caption: 'Sky, doing its thing.',
  },
  {
    id: '5',
    image:
      'https://images.unsplash.com/photo-1647842392232-6db2a139b494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudHMlMjBtaW5pbWFsJTIwaW5kb29yfGVufDF8fHx8MTc2OTc2MDgyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    tag: 'Desk',
    caption: 'Desk companion.',
  },
  {
    id: '6',
    image:
      'https://images.unsplash.com/photo-1543749247-18150e7fa4b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMGJsdWUlMjB0ZWFsfGVufDF8fHx8MTc2OTc2MDgyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    tag: 'Study',
    caption: 'Colour study.',
  },
  {
    id: '7',
    image:
      'https://images.unsplash.com/photo-1612907527100-f02bb2b26b1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3RlYm9vayUyMGpvdXJuYWwlMjB3cml0aW5nfGVufDF8fHx8MTc2OTc2MDgyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    tag: 'Notes',
    caption: 'Thinking on paper.',
  },
];

export function VisualSidebar() {
  return (
    <div>
      <div className="mb-2 flex items-baseline gap-3">
        <span className="font-display text-sm font-semibold text-[var(--accent)]">02</span>
        <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-[var(--ink)] md:text-3xl">
          The Trail Log
        </h2>
      </div>
      <p className="mb-8 text-sm text-[var(--ink-soft)]">
        Bits &amp; pieces collected along the wander.
      </p>

      <div className="space-y-6">
        {visualPosts.map((post, i) => (
          <motion.figure
            key={post.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)] transition-all duration-300 hover:border-[var(--accent)]/40"
          >
            <div className="relative overflow-hidden">
              <ImageWithFallback
                src={post.image}
                alt={post.caption || 'A photo from the trail'}
                className="h-56 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {post.tag && (
                <span className="absolute bottom-3 left-3 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
                  {post.tag}
                </span>
              )}
            </div>
            {post.caption && (
              <figcaption className="px-4 py-3 text-sm text-[var(--ink-soft)]">
                {post.caption}
              </figcaption>
            )}
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
