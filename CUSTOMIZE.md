# Customization Guide

This guide helps you personalize the Sidequests website with your own content, colors, and branding.

## Quick Customization Checklist

### 1. Personal Information

**Name and Branding**

Edit `/src/app/components/Header.tsx`:
```tsx
<div className="font-medium text-gray-900">
  Your Name Here  // Change "Alex Chen"
</div>
```

Edit `/src/app/components/Footer.tsx`:
```tsx
© Your Name {currentYear}. All rights reserved.
```

### 2. Hero Section

Edit `/src/app/components/Hero.tsx`:
```tsx
<h1>Your Site Title</h1>  // Change "Sidequests"
<p>Your tagline or description here...</p>
```

### 3. Blog Posts

Edit `/src/app/components/BlogFeed.tsx`:

```tsx
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Your Article Title',
    content: 'Your article content...',
    image: 'https://...',  // Use Unsplash URLs or your own
  },
  // Add more posts...
];
```

### 4. Visual Sidebar

Edit `/src/app/components/VisualSidebar.tsx`:

```tsx
const visualPosts: VisualPost[] = [
  {
    id: '1',
    image: 'https://...',
    caption: 'Your caption',
  },
  // Add more visual posts...
];
```

### 5. About Section

Edit `/src/app/components/ContentSections.tsx` in the `AboutSection` function:

```tsx
<p className="text-lg text-gray-700 mb-6">
  Your bio and background...
</p>
```

### 6. Writing & Experiments

Also in `/src/app/components/ContentSections.tsx`:

- Update `WritingSection()` with your writing samples
- Update `ExperimentsSection()` with your projects

## Color Customization

### Using the Cool Color Palette

The site uses these CSS variables (defined in `/src/styles/theme.css`):

```css
--cool-blue: #5B8FA3;
--cool-teal: #4ECDC4;
--cool-green: #95B8A8;
--cool-gray: #6B7280;
--cool-slate: #475569;
--off-white: #F8FAFC;
```

**To change colors:**

1. Open `/src/styles/theme.css`
2. Update the hex values in the `:root` section
3. Colors will automatically update throughout the site

### Using Tailwind Color Classes

You can also change colors directly in components:

- `text-teal-600` → `text-blue-600` (change teal to blue)
- `bg-gray-50` → `bg-slate-50` (change background)
- `border-gray-200` → `border-blue-200` (change borders)

## Typography

### Font Family

The site uses system fonts by default. To add a custom font:

1. Add font import to `/src/styles/fonts.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
```

2. Update `/src/styles/theme.css`:
```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

## Adding New Sections

### Add a New Section to Navigation

1. Open `/src/app/components/Header.tsx`
2. Add to `navItems` array:
```tsx
{ id: 'portfolio', label: 'Portfolio' }
```

3. Create a new section component in `/src/app/components/ContentSections.tsx`:
```tsx
export function PortfolioSection() {
  return (
    <section id="portfolio" className="scroll-mt-20 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-gray-900 mb-8">Portfolio</h2>
        {/* Your content */}
      </div>
    </section>
  );
}
```

4. Import and add to `/src/app/App.tsx`:
```tsx
import { PortfolioSection } from '@/app/components/ContentSections';

// In the return statement:
<PortfolioSection />
```

## Images

### Using Your Own Images

Replace Unsplash URLs with your own:

```tsx
image: '/path/to/your/image.jpg'
```

Place images in the `public` folder and reference them as:
```tsx
image: '/images/my-photo.jpg'
```

### Getting New Images from Unsplash

Visit [Unsplash](https://unsplash.com), find an image, and copy the URL.

## Layout Adjustments

### Two-Column Layout Width

Edit `/src/app/App.tsx`:

```tsx
// Make left column wider
<div className="grid lg:grid-cols-[2fr,1fr] gap-12">

// Make sidebar wider  
<div className="grid lg:grid-cols-[1fr,500px] gap-12">
```

### Disable Sidebar Sticky Scroll

Remove sticky positioning from `/src/app/App.tsx`:

```tsx
<div className="">  {/* Remove lg:sticky lg:top-24 lg:self-start */}
  <div className="lg:pr-2">
    <VisualSidebar />
  </div>
</div>
```

## Footer Quote

Edit `/src/app/components/Footer.tsx`:

```tsx
<p className="text-xl text-gray-700 italic max-w-2xl mx-auto">
  "Your favorite quote here..."
</p>
```

## Remove Sections

To hide sections you don't need, comment them out in `/src/app/App.tsx`:

```tsx
{/* <WritingSection /> */}
{/* <ExperimentsSection /> */}
```

## Testing Changes

After making changes:

1. Save the file
2. Check your browser (should auto-reload)
3. Test on mobile: resize your browser window
4. When ready: commit and push to deploy

```bash
git add .
git commit -m "Customize content and branding"
git push
```

Your site will automatically rebuild on GitHub Pages!

## Need Help?

- Check `/README.md` for technical details
- See `/DEPLOY.md` for deployment help
- View component files for structure examples
