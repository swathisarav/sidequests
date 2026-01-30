# Sidequests

A personal website for essays, experiments, explorations, and unfinished thoughts.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Two-Column Layout**: Editorial blog feed + independently scrolling visual sidebar
- **Smooth Navigation**: Sticky header with active section highlighting
- **Modern Aesthetic**: Cool color palette with generous whitespace and subtle shadows
- **GitHub Pages Ready**: Static site, easy to deploy

## Deployment to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. Push this code to your GitHub repository
2. Go to repository Settings → Pages
3. Under "Build and deployment", select "GitHub Actions"
4. Create a new file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

5. Push the workflow file and your site will automatically deploy!

### Option 2: Manual Deployment

1. Build the site locally:
   ```bash
   npm run build
   # or
   pnpm build
   ```

2. Push the `dist` folder to a `gh-pages` branch:
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

3. In repository Settings → Pages, select the `gh-pages` branch

### Base Path Configuration

If your site is hosted at `username.github.io/repo-name`, update `vite.config.ts`:

```ts
export default defineConfig({
  base: '/repo-name/',
  // ... rest of config
})
```

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## Customization

- **Content**: Edit blog posts in `/src/app/components/BlogFeed.tsx`
- **Visual posts**: Update images in `/src/app/components/VisualSidebar.tsx`
- **Colors**: Modify CSS variables in `/src/styles/theme.css`
- **Name/branding**: Update in `/src/app/components/Header.tsx` and `/src/app/components/Footer.tsx`
- **Sections**: Edit content in `/src/app/components/ContentSections.tsx`

## Technical Stack

- React 18
- TypeScript
- Tailwind CSS v4
- Vite
- Semantic HTML5

## License

All rights reserved.
