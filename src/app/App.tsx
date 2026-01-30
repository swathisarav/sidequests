import { useState } from 'react';
import { QuestCard } from '@/app/components/QuestCard';

interface Quest {
  id: string;
  image: string;
  title: string;
  caption: string;
  tags: string[];
  content: string;
}

const quests: Quest[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1597434429739-2574d7e06807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMG5hdHVyZXxlbnwxfHx8fDE3Njk2ODc3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Mountain Expedition',
    caption: 'A journey through the peaks and valleys of adventure',
    tags: ['Adventure', 'Nature', 'Photography'],
    content: `## The Journey Begins

Embarking on a mountain expedition is more than just a physical challenge—it's a **transformative experience** that tests your limits and rewards you with breathtaking views.

### What to Expect

- **Stunning landscapes** at every turn
- Challenging terrain that builds character
- Opportunities for incredible photography
- A chance to disconnect and find inner peace

> "The mountains are calling, and I must go." - John Muir

This expedition will take you through alpine meadows, across rushing streams, and up to vantage points where you can see for miles in every direction.`,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1714973148365-6db2ef41d7c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2OTY0ODA0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Coffee & Code',
    caption: 'Building something meaningful, one cup at a time',
    tags: ['Development', 'Productivity', 'Lifestyle'],
    content: `## The Perfect Work Environment

Creating the ideal workspace is essential for productivity and creativity. A good cup of coffee and a clean desk can make all the difference.

### Essential Elements

1. **Quality coffee** - Fuel for the mind
2. **Ergonomic setup** - Comfort for long coding sessions
3. **Natural light** - Energy and focus
4. **Minimal distractions** - Deep work mode

The combination of caffeine and code has powered countless innovations. Whether you're debugging a tricky issue or architecting a new feature, the right environment sets the stage for success.

**Pro tip:** Take regular breaks to stretch and rest your eyes!`,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29kaW5nJTIwcHJvZ3JhbW1pbmd8ZW58MXx8fHwxNzY5NjQ5MTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Tech Innovation',
    caption: 'Exploring the cutting edge of technology',
    tags: ['Technology', 'AI', 'Innovation'],
    content: `## The Future is Here

Technology is evolving at an unprecedented pace. From artificial intelligence to quantum computing, we're witnessing innovations that seemed impossible just a decade ago.

### Key Trends

- **AI & Machine Learning** - Transforming every industry
- **Cloud Computing** - Scalable and accessible infrastructure
- **Blockchain** - Decentralized trust and transparency
- **IoT** - Connected devices everywhere

These technologies aren't just buzzwords—they're reshaping how we live, work, and interact with the world around us.

### Getting Involved

The best way to understand these innovations is to get hands-on experience. Start with small projects, experiment, and learn from the community.`,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1525019167271-be1690bb034f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMGFic3RyYWN0fGVufDF8fHx8MTc2OTcwMTA0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Creative Design',
    caption: 'Where art meets functionality',
    tags: ['Design', 'Creativity', 'UX'],
    content: `## The Art of Design

Great design is invisible. It guides users effortlessly through experiences, making complex tasks feel simple and intuitive.

### Design Principles

1. **Simplicity** - Remove everything unnecessary
2. **Consistency** - Create predictable patterns
3. **Feedback** - Let users know what's happening
4. **Accessibility** - Design for everyone

> "Good design is as little design as possible." - Dieter Rams

Whether you're creating a website, an app, or a physical product, these principles remain constant. The goal is always to solve problems elegantly.

### Tools of the Trade

Modern designers have an incredible toolkit at their disposal—from Figma to Framer, from Adobe Creative Suite to Procreate. But remember: tools are just that. Your vision and creativity are what truly matter.`,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1663017225895-61cfe42309ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmUlMjBqb3VybmV5fGVufDF8fHx8MTc2OTcwMTA0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'World Wanderer',
    caption: 'Stories from across the globe',
    tags: ['Travel', 'Culture', 'Adventure'],
    content: `## Discovering New Horizons

Travel opens your mind to new perspectives, cultures, and ways of life. Every destination has a story to tell, and every journey teaches you something new.

### Travel Tips

- **Pack light** - You need less than you think
- **Learn basic phrases** - Respect the local language
- **Try local food** - It's part of the culture
- **Talk to locals** - The best recommendations come from them
- **Keep an open mind** - Embrace the unexpected

### Memorable Moments

The best travel experiences often happen when things don't go according to plan. Getting lost in a new city, stumbling upon a hidden gem, or making friends with locals—these unplanned moments become the stories you'll tell for years.

**Remember:** The journey is just as important as the destination.`,
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1581855339095-0c282d58527b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHJlYWRpbmclMjBrbm93bGVkZ2V8ZW58MXx8fHwxNzY5NzAxMDQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Knowledge Quest',
    caption: 'Continuous learning and growth',
    tags: ['Learning', 'Books', 'Education'],
    content: `## The Power of Reading

Books are portals to different worlds, different times, and different minds. They're one of the most powerful tools for personal growth and learning.

### Why Read?

- **Expand your vocabulary** and communication skills
- **Gain new perspectives** on life and the world
- **Improve focus** and concentration
- **Reduce stress** through escapism
- **Enhance empathy** by experiencing different lives

### Building a Reading Habit

Start small—even 15 minutes a day makes a difference. Choose books that genuinely interest you, not just what you think you "should" read.

> "A reader lives a thousand lives before he dies. The man who never reads lives only one." - George R.R. Martin

### Recommended Genres

Fiction helps you understand human nature. Non-fiction builds knowledge. Poetry teaches you to see beauty in language. Try them all and discover what resonates with you.`,
  },
];

export default function App() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCardToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl mb-4 text-gray-900">Sidequests</h1>
          <p className="text-gray-600 text-lg">
            Click any card to explore the full story
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest) => (
            <QuestCard
              key={quest.id}
              {...quest}
              isExpanded={expandedId === quest.id}
              onToggle={() => handleCardToggle(quest.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
