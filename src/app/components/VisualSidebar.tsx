import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface VisualPost {
  id: string;
  image: string;
  /** Optional short looping clip; `image` is used as its poster */
  video?: string;
  caption?: string;
}

const visualPosts: VisualPost[] = [
  {
    id: '1',
    image:
      'https://itaesahinwgttopvkkip.supabase.co/storage/v1/object/public/SideQuest_Carousel/netravati_me.png',
    caption: 'Somewhere up high.',
  },
  {
    id: '2',
    image:
      'https://itaesahinwgttopvkkip.supabase.co/storage/v1/object/public/SideQuest_Carousel/Netravati.jpg',
    caption: 'Netravati Peak - mountains & the calm they bring.',
  },
  {
    id: '3',
    // Converted from the iPhone .MOV (HEVC) to H.264 MP4 so it plays in every browser
    video: `${import.meta.env.BASE_URL}media/kuari_summit.mp4`,
    image: `${import.meta.env.BASE_URL}media/kuari_summit_poster.jpg`,
    caption: 'Kuari Pass summit.',
  },
  {
    id: '4',
    video: `${import.meta.env.BASE_URL}media/kuari_trek.mp4`,
    image: `${import.meta.env.BASE_URL}media/kuari_trek_poster.jpg`,
    caption: 'Meet my travel companion at Kuari Pass - Tommy',
  },
  {
    id: '5',
    // Converted from iPhone HEIC to JPG so it shows in every browser
    image: `${import.meta.env.BASE_URL}media/leme.jpg`,
    caption: 'Bundled up at camp. It was soo cold.',
  },
  {
    id: '6',
    image: `${import.meta.env.BASE_URL}media/hbg.jpg`,
    caption: 'Harrisburg, and the fountain turned pink.',
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
              {post.video ? (
                <video
                  src={post.video}
                  poster={post.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={post.caption}
                  className="block h-auto w-full"
                />
              ) : (
                <ImageWithFallback
                  src={post.image}
                  alt={post.caption || 'A photo from the trail'}
                  className="block h-auto w-full"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
