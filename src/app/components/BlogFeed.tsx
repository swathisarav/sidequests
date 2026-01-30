import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image?: string;
  video?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'On Building Systems That Think',
    content: 'I\'ve been thinking about how we design systems that aren\'t just efficient, but adaptive. The best frameworks aren\'t rigid—they\'re responsive. They learn from friction, adjust to context, and evolve with use. This applies to everything from product architecture to personal workflows. The trick is knowing which parts should be fixed and which should flex.',
    image: 'https://images.unsplash.com/photo-1505209487757-5114235191e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd29ya3NwYWNlJTIwZGVzayUyMGxhcHRvcHxlbnwxfHx8fDE3Njk3NjA4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    title: 'The Second-Order Effects of Good Decisions',
    content: 'Every choice creates ripples. The obvious outcomes are easy to see—launch a feature, users adopt it. But the second-order effects? Those are where the real impact lives. A feature that simplifies onboarding might also change team dynamics. A pricing strategy might attract different customer segments that reshape your roadmap. Strategic thinking means mapping not just the next move, but the moves after that.',
    image: 'https://images.unsplash.com/photo-1734549097883-fb428ab88cb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHBhdHRlcm4lMjBibHVlfGVufDF8fHx8MTc2OTcwOTIzMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: 'Prototyping as a Form of Thinking',
    content: 'Sometimes the fastest way to think through a problem is to build something. Not a polished product—just a rough sketch in code, a quick mockup, a lo-fi prototype. It forces you to confront the gaps in your logic, the assumptions you haven\'t validated, the edge cases you missed. A prototype is an argument made tangible. And often, the act of building reveals the real question you should be asking.',
    image: 'https://images.unsplash.com/photo-1597434429739-2574d7e06807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY5Njk0NDk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    title: 'Why I Write',
    content: 'Writing is my way of thinking out loud. It\'s how I test ideas, clarify fuzzy concepts, and spot flaws in my reasoning. Publishing adds accountability—once it\'s out there, I have to defend it, refine it, or admit I was wrong. This site is a public notebook. Some entries are polished essays. Others are half-baked thoughts. All of them are steps in a longer process of figuring things out.',
  },
];

export function BlogFeed() {
  return (
    <div className="space-y-8 md:space-y-12">
      {blogPosts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-2xl text-gray-900 mb-4">
            {post.title}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {post.content}
          </p>
          {post.image && (
            <div className="rounded-xl overflow-hidden">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}