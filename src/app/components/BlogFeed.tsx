import { useEffect, useId, useRef, useState } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Reveal } from '@/app/components/Reveal';

/** Collapsed height of a post body before "Keep reading" (px) */
const COLLAPSED_HEIGHT = 420;

interface Message {
  time: string;
  text: string;
}

interface BlogPost {
  id: string;
  title: string;
  date?: string;
  content?: React.ReactNode;
  /** Renders the post as a thread of sent text messages */
  messages?: Message[];
  /** Shows a phone-style "No Service" bar above the messages */
  noSignal?: boolean;
  image?: string;
  imageAlt?: string;
  video?: string;
  poster?: string;
  /** Placeholder posts get the playful "brewing" treatment */
  placeholder?: boolean;
}

// Newest first: add new posts at the top of this list.
// The homepage shows the latest post; the rest live on the Field Notes page (#/field-notes).
export const blogPosts: BlogPost[] = [
  {
    id: 'himalayan-blues',
    title: 'Time in the Himalayas',
    date: '16 April',
    noSignal: true,
    image:
      'https://itaesahinwgttopvkkip.supabase.co/storage/v1/object/public/SideQuest_Carousel/Kuari_pass.jpg',
    imageAlt: 'Kuari Pass',
    messages: [
      { time: '1:40 pm', text: 'Dude, time is so slow in the mountains. What feels like an hour is 10 mins.' },
      {
        time: '4:21 pm',
        text: 'As you keep walking up the inclined slopes, along the paths walked by the people before you, your attention shifts away from everything else. The entire focus is on your breath and your steps - inhale and step, exhale and step - finding that rhythm and staying with it.',
      },
      {
        time: '4:25 pm',
        text: "Every few minutes, we pause along our trail and reach for our friends' bottles (ours being too difficult to reach) to hydrate ourselves. A sip, a little more energy, a little more will to move forward. And we keep doing this.",
      },
      {
        time: '6:58 pm',
        text: 'Sometimes, our trek leader stops to say hi to fellow trekkers, and we use the opportunity to catch our breath. We keep hoping he runs into people more often.',
      },
      {
        time: '6:59 pm',
        text: 'The views are breathtaking, and so is the trek. All I want to do is eat, sleep, walk around and capture the scenes.',
      },
      { time: '8:12 pm', text: "It's soo fcking cold now." },
      { time: '8:13 pm', text: "Hmm, idk what I'm going to do next in my life." },
      {
        time: '8:47 pm',
        text: "The trek leader thinks we're doing pretty well and suggested we do Mini Pangarchulla for summit day tomorrow. It's a little harder than the one we signed up for.",
      },
      { time: '9:20 pm', text: 'I saw snow for the first time today.' },
      {
        time: '9:22 pm',
        text: "We made a snowman, Anushka and I. It was so much fun playing in the snow. I've been taking your hoodie everywhere.",
      },
      { time: '10:02 pm', text: 'Oh, the food here is sooo yum.' },
      { time: '10:43 pm', text: "It's summit day tomorrow. We wake up at 6." },
    ],
  },
  {
    id: 'notes-from-covid',
    title: 'Notes from COVID',
    date: 'May 2021',
    content: (
      <div className="space-y-8">
        <blockquote className="border-l-2 border-[var(--accent)] pl-4">
          <p className="font-display text-lg italic text-[var(--ink)]">
            &ldquo;When you help others, help finds you.&rdquo;
          </p>
          <p className="mt-1 text-sm">Iroh, the Dragon of the West, The Last Airbender</p>
        </blockquote>

        <NoteSection title="About being a cloud">
          <p>
            I liked cloud gazing ever since I was a kid. When I was asked what I would be in my
            next life, I replied &ldquo;A cloud&rdquo;. The kid wanted to be able to look at
            everything from above, be a spectator, though short lived, a peaceful life.
          </p>
        </NoteSection>

        <NoteSection title="For the monastic one (Ol.lives)....">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">Scene</p>
          <p className="italic">
            Sam, Eli, Vicky and Swa playing video games. Sasha, Sva and Amy on the couch on their
            phones. Addie reading a book.
          </p>
          <p className="pt-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">Script</p>
          <p>
            <span className="font-semibold text-[var(--ink)]">Sva</span>{' '}
            <span className="italic">(in a state of trance)</span>: maybe I&apos;ll become a monk
          </p>
          <p className="italic">(Still looking at the phone)</p>
          <p className="italic">(Imagines a monk kicking into the air)</p>
          <p>
            <span className="font-semibold text-[var(--ink)]">The rest</span>{' '}
            <span className="italic">
              (look away from what they are doing... silence... imagine the bald headed monastic
              sitting under a tree.... start laughing)
            </span>
          </p>
          <ul className="list-disc pl-5 italic">
            <li>Highlight the shaved head with lighting and make it shine</li>
          </ul>
        </NoteSection>

        <NoteSection title="About the prison">
          <p>Contento, Anger are all locked up in the prison called mind.</p>
          <p>Anger however escapes from the prison every now and then.</p>
          <p>And Grief locks him up again.</p>
          <p>
            One day Contento leaves his prison and frees Inspiration, Curiosity and Wonder. And
            they all get to work for their dreams. Then Society shows them Despair, and Depression
            starts to rule their world.
          </p>
        </NoteSection>

        <NoteSection title="Pitter Patter">
          <p className="font-display text-[var(--ink)] leading-loose">
            The slow pitter patter stops
            <br />
            Swathing the land in stillness;
            <br />
            A thunderous roar
            <br />
            Breaks the shackles
            <br />
            And frees the human;
            <br />
            Then falls the rain of hope
            <br />
            Into the barren land
            <br />
            Nourishing the latent seeds
            <br />
            To grow into the tree of discoveries.
          </p>
        </NoteSection>

        <NoteSection title="About the best job in a utopian world">
          <p>
            The world is a wonderful place filled with wonderful people doing wonderful things. And
            the best thing amongst them all is telling the tales of the world that have been passed
            down to us by our previous generations to the ones who will rule the world tmrw.
          </p>
        </NoteSection>

        <NoteSection title="The Process of Planning">
          <ol className="space-y-2">
            <li>
              <span className="font-semibold text-[var(--ink)]">Step 1</span> Create a plan. It
              need not be complete or be perfect. It could be a very rough plan. But the important
              thing is to have a skeleton to work on. It&apos;d be more convenient to not add too
              many details.
            </li>
            <li>
              <span className="font-semibold text-[var(--ink)]">Step 2</span> Analyse the plan and
              list its flaws and its missing components.
            </li>
            <li>
              <span className="font-semibold text-[var(--ink)]">Step 3</span> Adjust the work to
              add all the missing elements and modify it.
            </li>
            <li>
              <span className="font-semibold text-[var(--ink)]">Step 4</span> Go over the plan
              again.
            </li>
          </ol>
          <p>Follow the steps above until you get a satisfactory result.</p>
          <p>
            <span className="font-semibold text-[var(--ink)]">Final step</span> Make note of the
            mistakes and tips learnt.
          </p>
        </NoteSection>

        <NoteSection title="Evolution of Science">
          <p>
            The mortality of the human life is essential for the evolution of science. It is
            through constant change that science takes forms.
          </p>
        </NoteSection>

        <NoteSection title="Luck">
          <p>They weren&apos;t lucky, they just never thought they were unlucky.</p>
        </NoteSection>

        <NoteSection title="Meaning of Life">
          <p>
            Life is full of wonders for one, and full of dread for another. What determines how
            life is? In my opinion, it depends on one&apos;s attitude to life and the freedom one
            has to make their decision free from influence.
          </p>
          <p>
            Life has no meaning, but it is not meaningless. One has the ability to give life the
            meaning that they desire.
          </p>
          <p>
            What is the absolute meaning, you ask? To that I may say, I&apos;m not sure if it
            exists or not, but I&apos;m looking.
          </p>
        </NoteSection>

        <NoteSection title="Luck and Probability">
          <p>
            The world works on principles of probability. And luck is but a special case of
            probability, when all outcomes are equally likely to happen.
          </p>
        </NoteSection>

        <NoteSection title="Theory of Relativity">
          <p>The laws of physics are true in all inertial frames of reference.</p>
        </NoteSection>
      </div>
    ),
  },
];

/** One short note inside a post: a small heading and its text */
function NoteSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="mb-3 font-display text-lg font-semibold text-[var(--ink)]">{title}</h4>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

/** Phone-style status icons: no signal and a low battery - up in the mountains */
function PhoneStatus() {
  return (
    <div
      role="img"
      aria-label="No signal, low battery"
      className="flex shrink-0 items-center gap-2 text-[var(--ink-soft)]"
    >
      {/* signal bars, all empty, with a slash through them */}
      <svg viewBox="0 0 24 18" className="h-4 w-auto" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={2 + i * 5}
            y={13 - i * 4}
            width="3"
            height={4 + i * 4}
            rx="1"
            fill="currentColor"
            opacity="0.3"
          />
        ))}
        <line x1="2" y1="1.5" x2="21" y2="16.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* battery, nearly empty */}
      <svg viewBox="0 0 28 14" className="h-3.5 w-auto" aria-hidden="true">
        <rect x="1" y="1" width="22" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <rect x="24.5" y="4.5" width="2.5" height="5" rx="1" fill="currentColor" opacity="0.6" />
        <rect x="3" y="3" width="4" height="8" rx="1.5" fill="var(--accent)" />
      </svg>
    </div>
  );
}

function MessageThread({ messages }: { messages: Message[] }) {
  return (
    <div className="flex flex-col items-end gap-1.5">
      {messages.map((m, i) => {
        const prev = messages[i - 1];
        const newBurst = !prev || prev.time.slice(-2) !== m.time.slice(-2) || gapMinutes(prev.time, m.time) >= 20;
        return (
          <div key={i} className={`flex w-full flex-col items-end ${newBurst && i > 0 ? 'mt-7' : ''}`}>
            {newBurst && (
              <span className="mb-2 self-center text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ink-soft)]/70">
                {m.time}
              </span>
            )}
            <p
              className="max-w-[85%] rounded-2xl rounded-br-md bg-[var(--accent-soft)] px-4 py-2.5 text-[15px] leading-relaxed text-[var(--ink)] md:max-w-[75%]"
              title={m.time}
            >
              {m.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/** Minutes between two "h:mm am/pm" times on the same day */
function gapMinutes(a: string, b: string) {
  const toMin = (t: string) => {
    const [, h, mm, ap] = t.match(/(\d+):(\d+)\s*(am|pm)/i) ?? [];
    return ((Number(h) % 12) + (ap?.toLowerCase() === 'pm' ? 12 : 0)) * 60 + Number(mm);
  };
  return toMin(b) - toMin(a);
}

/** Caps a post body at COLLAPSED_HEIGHT with a fade and an expand toggle.
 *  The toggle only appears when the content is actually taller than the cap. */
function ExpandablePostBody({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const id = useId();

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => setFullHeight(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const overflows = fullHeight > COLLAPSED_HEIGHT + 40;
  const maxHeight = !overflows || expanded ? fullHeight || undefined : COLLAPSED_HEIGHT;

  const toggle = () => {
    if (expanded) {
      // Bring the post back into view so collapsing doesn't strand the reader below it
      const top = wrapperRef.current?.closest('article')?.getBoundingClientRect().top ?? 0;
      if (top < 0) wrapperRef.current?.closest('article')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setExpanded((v) => !v);
  };

  return (
    <div ref={wrapperRef}>
      <div
        id={id}
        className="relative overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight }}
      >
        <div ref={contentRef}>{children}</div>
        {overflows && (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--card)] to-transparent transition-opacity duration-300 ${
              expanded ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
      </div>

      {overflows && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls={id}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)] transition-colors hover:border-[var(--accent)]/60 hover:bg-[var(--accent-soft)]"
          >
            {expanded ? 'Show less' : 'Keep reading'}
            <svg
              viewBox="0 0 12 12"
              className={`h-3 w-3 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              aria-hidden="true"
            >
              <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export const FIELD_NOTES_HASH = '#/field-notes';

/**
 * `limit` shows only the newest N posts (homepage) with a link to the full list.
 * Without it, every post is shown (the Field Notes page).
 */
export function BlogFeed({ limit, standalone }: { limit?: number; standalone?: boolean }) {
  const posts = limit ? blogPosts.slice(0, limit) : blogPosts;
  const hidden = blogPosts.length - posts.length;

  return (
    <div>
      <Reveal>
        <div className="mb-8 flex items-baseline gap-3">
          <span className="font-display text-sm font-semibold text-[var(--accent)]">01</span>
          <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-[var(--ink)] md:text-3xl">
            Field Notes
          </h2>
          <span className="mb-1 flex-1 border-b border-dashed border-[var(--line)]" />
          {standalone && (
            <a
              href="#sidequests"
              className="text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--ink)]"
            >
              ← Back home
            </a>
          )}
        </div>
      </Reveal>

      <div className="space-y-8 md:space-y-10">
        {posts.map((post, i) => (
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

              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="font-display text-2xl font-semibold md:text-3xl text-[var(--ink)]">
                  {post.title}
                </h3>
                {post.noSignal && <PhoneStatus />}
              </div>


              {/* Only the text collapses; photos and video below stay visible */}
              <ExpandablePostBody>
                {post.messages ? (
                  <div className="mt-6 mb-2">
                    <MessageThread messages={post.messages} />
                  </div>
                ) : (
                  <div className="text-[var(--ink-soft)] leading-relaxed mb-6">
                    {post.content}
                  </div>
                )}
              </ExpandablePostBody>

              {post.video && (
                <div className="mt-6 mb-6 overflow-hidden rounded-xl bg-black">
                  <video
                    src={post.video}
                    poster={post.poster}
                    controls
                    playsInline
                    preload="metadata"
                    className="mx-auto max-h-[70vh] w-full object-contain"
                  />
                </div>
              )}

              {post.image && (
                <div className="mt-6 overflow-hidden rounded-xl">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
                    className="block h-auto w-full"
                  />
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      {hidden > 0 && (
        <Reveal>
          <a
            href={FIELD_NOTES_HASH}
            className="group mt-8 flex items-center justify-between rounded-2xl border border-dashed border-[var(--line)] px-6 py-5 transition-colors hover:border-[var(--accent)]/50"
          >
            <span className="font-display text-lg text-[var(--ink)]">
              All field notes
              <span className="ml-2 text-sm text-[var(--ink-soft)]">
                {hidden} more {hidden === 1 ? 'post' : 'posts'}
              </span>
            </span>
            <span className="text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
      )}
    </div>
  );
}
