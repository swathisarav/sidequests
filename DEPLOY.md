# GitHub Pages Deployment Guide

This guide will help you deploy the Sidequests website to GitHub Pages.

## Quick Start

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it whatever you like (e.g., `sidequests`, `personal-site`, etc.)
3. Make it public (required for free GitHub Pages)
4. Don't initialize with README (we already have one)

### Step 2: Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Sidequests website"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under "Build and deployment":
   - Source: Select **GitHub Actions**
4. The workflow file is already included in `.github/workflows/deploy.yml`
5. Your site will automatically build and deploy!

### Step 4: Access Your Site

After a few minutes, your site will be live at:
- `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Configuration

### Custom Domain (Optional)

If deploying to a repository (not `username.github.io`), update `vite.config.ts`:

```ts
export default defineConfig({
  base: '/YOUR_REPO_NAME/',
  // ... rest of config
})
```

Then commit and push:
```bash
git add vite.config.ts
git commit -m "Update base path for GitHub Pages"
git push
```

### Using a Custom Domain

1. In your repository Settings → Pages
2. Enter your custom domain under "Custom domain"
3. Add a CNAME file in the `public` folder with your domain
4. Configure DNS with your domain provider:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`

## Troubleshooting

### Site shows 404

- Check that GitHub Pages is enabled in Settings
- Verify the base path in `vite.config.ts` matches your repo name
- Wait a few minutes for the deployment to complete

### Build fails

- Check the Actions tab for error details
- Ensure all dependencies are in `package.json`
- Check that the build succeeds locally: `npm run build`

### Updating the Site

Just push changes to the main branch:
```bash
git add .
git commit -m "Update content"
git push
```

The site will automatically rebuild and deploy!

## Manual Build (Alternative)

If you prefer not to use GitHub Actions:

1. Build locally:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder:
   ```bash
   npm install -g gh-pages
   gh-pages -d dist
   ```

3. In Settings → Pages, select the `gh-pages` branch

## Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
