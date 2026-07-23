import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { BlogFeed } from '@/app/components/BlogFeed';
import { VisualSidebar } from '@/app/components/VisualSidebar';
import { BuildsSection, AboutSection } from '@/app/components/ContentSections';
import { Footer } from '@/app/components/Footer';
import { ScrollProgress } from '@/app/components/ScrollProgress';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <ScrollProgress />
      <Header />
      <Hero />

      {/* Two-column layout - responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-16">
          {/* Left column: Blog feed */}
          <div className="order-1">
            <BlogFeed />
          </div>

          {/* Right column: whimsical scrapbook, independent scroll on desktop */}
          <div className="order-2 lg:sticky lg:top-24 lg:self-start">
            <div className="lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2 scrollbar-thin">
              <VisualSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Additional sections */}
      <BuildsSection />
      <AboutSection />

      <Footer />
    </div>
  );
}
