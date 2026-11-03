# Public Assets

Place static assets in this folder. They will be copied to the root of your deployed site.

## Usage

Files in this folder can be referenced in your code using absolute paths:

```tsx
// For an image at /public/images/photo.jpg
<img src="/images/photo.jpg" alt="My photo" />
```

## Recommended Structure

```
public/
├── images/          # Your images
│   ├── hero.jpg
│   └── profile.png
├── fonts/           # Custom fonts (if not using CDN)
├── favicon.ico      # Site favicon
└── robots.txt       # SEO configuration
```

## Adding a Favicon

1. Generate favicons at [favicon.io](https://favicon.io) or similar
2. Place them in this public folder
3. They'll automatically be available at the root of your site

## Custom Domain (CNAME)

If using a custom domain with GitHub Pages:

1. Create a file named `CNAME` in this folder
2. Add your domain:
   ```
   yourdomain.com
   ```
3. Commit and push

## robots.txt

Example `robots.txt` for SEO:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```
