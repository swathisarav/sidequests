import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [activeSection, setActiveSection] = useState('sidequests');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['sidequests', 'builds', 'about'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'sidequests', label: 'Sidequests' },
    { id: 'builds', label: 'Builds' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--paper)]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollToSection('sidequests')}
          className="group flex items-center gap-2 text-left"
        >
          <span className="text-[var(--accent)] transition-transform duration-500 group-hover:rotate-180">
            &#10022;
          </span>
          <span className="font-display text-lg tracking-tight text-[var(--ink)]">
            Swathi Saravanan
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`relative px-3 py-1.5 text-sm transition-colors ${
                activeSection === id
                  ? 'text-[var(--ink)]'
                  : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
              }`}
            >
              {label}
              {activeSection === id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-[var(--accent)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[var(--ink-soft)] hover:text-[var(--ink)]"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-[var(--line)] bg-[var(--paper)]/95 backdrop-blur-md"
          >
            <nav className="flex flex-col px-6 py-4 space-y-1">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-left py-2 transition-colors ${
                    activeSection === id
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
