export function WritingSection() {
  return (
    <section id="writing" className="scroll-mt-20 py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-gray-900 mb-6 md:mb-8">Writing</h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl text-gray-900 mb-3">The Art of Strategic Patience</h3>
            <p className="text-gray-600 mb-4">
              In a world that rewards speed, knowing when to slow down is a competitive advantage. Strategic patience isn't about waiting—it's about timing.
            </p>
            <span className="text-sm text-teal-600">Read more →</span>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl text-gray-900 mb-3">Systems Thinking for Startups</h3>
            <p className="text-gray-600 mb-4">
              Building a company is about creating interconnected systems that reinforce each other. Here's how to think in loops, not lines.
            </p>
            <span className="text-sm text-teal-600">Read more →</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BuildsSection() {
  return (
    <section id="experiments" className="scroll-mt-20 py-12 md:py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-gray-900 mb-6 md:mb-8">Builds</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎸</span>
            </div>
            <h3 className="text-lg text-gray-900 mb-2">Guitar Log</h3>
            <p className="text-sm text-gray-600">
              An interactive tool to plan and track your Guitar Practices.
              <a href="https://guitar-ilemnite.base44.app">Here</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-gray-900 mb-6 md:mb-8">About</h2>
        <div className="max-w-3xl">
          <p className="text-lg text-gray-700 mb-6">
            Hi, I'm Swathi. I'm a Mechanical Engineering grad student at UPenn, focusing on developing a strong business and strategy perspective. I love a nature getaway and contemplating about life. As someone who is addicted to the novice high, you'll often see me picking up new hobbies and trying out new things.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            You can find my professional portfolio <a href=" https://swathisarav.github.io/portfolio/">here</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
