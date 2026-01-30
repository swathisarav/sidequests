import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface VisualPost {
  id: string;
  image: string;
  caption?: string;
}

const visualPosts: VisualPost[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1573134005528-db6a82e51995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBtb2Rlcm4lMjBtaW5pbWFsfGVufDF8fHx8MTc2OTc2MDgyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Morning ritual',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1665043548178-8e606eca11eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBtaW5pbWFsJTIwbW9kZXJufGVufDF8fHx8MTc2OTczMzAzNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1711185896337-ee0ca611c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcmVhZGluZyUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3Njk3NjA4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Current read',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1766869379184-c85fa64eb4ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZHMlMjBza3klMjBwZWFjZWZ1bHxlbnwxfHx8fDE3Njk3NjA4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1647842392232-6db2a139b494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudHMlMjBtaW5pbWFsJTIwaW5kb29yfGVufDF8fHx8MTc2OTc2MDgyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Desk companion',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1543749247-18150e7fa4b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMGJsdWUlMjB0ZWFsfGVufDF8fHx8MTc2OTc2MDgyNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1612907527100-f02bb2b26b1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3RlYm9vayUyMGpvdXJuYWwlMjB3cml0aW5nfGVufDF8fHx8MTc2OTc2MDgyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Thinking on paper',
  },
];

export function VisualSidebar() {
  return (
    <div className="space-y-6">
      {visualPosts.map((post) => (
        <div
          key={post.id}
          className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <div className="relative overflow-hidden">
            <ImageWithFallback
              src={post.image}
              alt={post.caption || 'Visual post'}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          {post.caption && (
            <div className="p-4">
              <p className="text-sm text-gray-600">{post.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
