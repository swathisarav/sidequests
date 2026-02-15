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
    title: 'About',
    content: ( <>
    <p>A page for my reflections.</p>
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