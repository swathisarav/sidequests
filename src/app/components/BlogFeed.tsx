import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Reveal } from '@/app/components/Reveal';

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
  image?: string;
  imageAlt?: string;
  video?: string;
  poster?: string;
  /** Placeholder posts get the playful "brewing" treatment */
  placeholder?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 'himalayan-blues',
    title: 'Time in the Himalayas',
    date: '16 April',
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
];

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

              {post.messages ? (
                <div className="mt-6 mb-2">
                  <MessageThread messages={post.messages} />
                </div>
              ) : (
                <div className="text-[var(--ink-soft)] leading-relaxed mb-6">
                  {post.content}
                </div>
              )}

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
                <div className="overflow-hidden rounded-xl">
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
    </div>
  );
}
