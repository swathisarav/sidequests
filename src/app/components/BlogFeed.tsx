import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface BlogPost {
  id: string;
  title: string;
  content: React.ReactNode;
  image?: string;
  video?: string;
}

const blogPosts: BlogPost[] = [
  
  {
    id: '1',
    title: 'About The Unfinished Projects',
    content: ( <>
    <p>Imagine this.</p>
    <p>
      You decide to build a project. You start with a vision. Then you think,
      <em>oh, it’d be nice if it also had this… and this… and this.</em>
      Suddenly, the vision is much bigger than what you started with.
    </p>

    <p>
      You begin anyway. You set up the framework and start filling in the details.
      Five hours later, you’re halfway through and tired. The end feels very far
      away. You close your laptop, thinking you’ll come back to it later.
    </p>

    <p>And that’s the last you see of it.</p>

    <p>
      This is something I go through far too often. Not just with projects, but
      with most things I do. I tend to want to do everything. The only times I
      really push through the exhaustion are when things genuinely matter, or
      when there’s a deadline looming over my head.
    </p>

    <p>
      So I decided to pause and think about what’s actually happening.
    </p>

    <p>
      I think it comes from a disconnect between where I currently am and where
      I want to be.
    </p>

    <p>
      I start with a vision of the end state, how complete or polished the
      project could eventually become. That picture is motivating at first.
      But it’s also far removed from my current skills, time, and energy.
    </p>

    <p>
      There’s no clear way to measure progress, because I’m comparing an early
      version of the work to a fully formed idea in my head. As that gap becomes
      more obvious, motivation drops. The project starts to feel heavier than it
      should.
    </p>

    <p>
      Eventually, it ends up in that familiar pile of things I started and never
      finished.
    </p>

    <p>
      It’s not that I don’t want to finish. It’s that I’m trying to jump too far
      ahead.
    </p>
    <p>
      What I should be doing instead is breaking the vision down — more like how
      apps are actually built and shipped.
    </p>

    <p>
      Start with something that’s complete, even if it’s small. Focus only on
      the parts that make the project feel whole at its current stage. Everything
      else can come later. Updates, iterations, extensions.
    </p>

    <p>
      Instead of asking,
      <em>“What do I want this to eventually be?”</em>
      I need to ask,
      <em>“What version of this makes sense for where I am right now?”</em>
    </p>

    <p>
      Letting a project exist in its first version feels uncomfortable. But
      finishing something imperfect is still finishing. And that feels like a
      better place to start.
    </p>
    </>
    ),
    image: 'https://images.unsplash.com/photo-1505209487757-5114235191e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd29ya3NwYWNlJTIwZGVzayUyMGxhcHRvcHxlbnwxfHx8fDE3Njk3NjA4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  }
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