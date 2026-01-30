export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16 md:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <blockquote className="text-center mb-6 md:mb-8">
          <p className="text-lg md:text-xl text-gray-700 italic max-w-2xl mx-auto">
            "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do." - H. Jackson Brown Jr.
          </p>
        </blockquote>
        <div className="text-center text-sm text-gray-500">
          © Swathi Saravanan {currentYear}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}