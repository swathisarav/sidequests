import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { BlogFeed, FIELD_NOTES_HASH } from '@/app/components/BlogFeed';
import { VisualSidebar } from '@/app/components/VisualSidebar';
import { AboutSection } from '@/app/components/ContentSections';
import { CairnsSection } from '@/app/components/Cairns';
import { Footer } from '@/app/components/Footer';
import { ScrollProgress } from '@/app/components/ScrollProgress';
import { useEffect, useState } from 'react';

export default function App() {
  // Simple hash routing: #/field-notes shows every post, anything else is the homepage
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const onFieldNotes = hash === FIELD_NOTES_HASH;

  // On switching views, jump to the top, or to the section named in the hash (e.g. #cairns)
  useEffect(() => {
    const id = hash.replace('#', '');
    const el = !onFieldNotes && id ? document.getElementById(id) : null;
    if (el) window.scrollTo({ top: el.offsetTop - 80 });
    else window.scrollTo({ top: 0 });
  }, [onFieldNotes]); // eslint-disable-line react-hooks/exhaustive-deps

  if (onFieldNotes) {
    return (
      <div className="min-h-screen bg-[var(--paper)]">
        <ScrollProgress />
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-16">
          <BlogFeed standalone />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <ScrollProgress />
      <Header />
      <Hero />

      {/* Two-column layout - responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-16">
          {/* Left column: Field Notes. On desktop it's a box the same height as the
              Trail Log and scrolls on its own; on mobile the page just scrolls. */}
          <div className="order-1 lg:sticky lg:top-24 lg:self-start">
            <div className="lg:h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-3 lg:pt-1 scrollbar-thin">
              <BlogFeed />
            </div>
          </div>

          {/* Right column: whimsical scrapbook, independent scroll on desktop */}
          <div className="order-2 lg:sticky lg:top-24 lg:self-start">
            <div className="lg:h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2 lg:pt-1 scrollbar-thin">
              <VisualSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Additional sections */}
      <CairnsSection />
      <AboutSection />

      <Footer />
    </div>
  );
}
