# Cloudflare R2 Image Storage Setup

This guide walks you through setting up Cloudflare R2 as the image CDN for blogeusz.

## Prerequisites

- A Cloudflare account
- Wrangler CLI installed: `pnpm add -g wrangler`
- Logged in: `wrangler login`

---

## 1. Create the R2 Bucket

```bash
wrangler r2 bucket create blogeusz-images
```

Verify it was created:

```bash
wrangler r2 bucket list
```

---

## 2. Enable Public Access (R2.dev or Custom Domain)

### Option A — Quick (r2.dev subdomain)

1. Go to **Cloudflare Dashboard → R2 → blogeusz-images → Settings**
2. Under **Public access**, enable "Allow public access"
3. You'll get a URL like: `https://pub-xxxxxxxx.r2.dev`

### Option B — Custom Domain (Recommended)

1. In **R2 bucket settings**, click **Custom Domains → Connect Domain**
2. Enter: `images.blogeusz.pl` (must be a zone on your Cloudflare account)
3. Cloudflare automatically creates the DNS record and issues a TLS certificate
4. Your images will be at: `https://images.blogeusz.pl/path/to/image.jpg`

---

## 3. Set Environment Variable

Create a `.env` file (copy from `.env.example`):

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
R2_BUCKET_NAME=blogeusz-images
R2_PUBLIC_URL=https://images.blogeusz.pl
```

Find your Account ID in the Cloudflare dashboard sidebar.

---

## 4. Upload Images

### Single file:

```bash
wrangler r2 object put blogeusz-images/photos/my-photo.jpg \
  --file ./my-photo.jpg \
  --content-type image/jpeg
```

### Batch upload from a directory:

```bash
# Upload all JPEGs from a local folder
for f in ./photos/*.jpg; do
  wrangler r2 object put "blogeusz-images/photos/$(basename $f)" \
    --file "$f" \
    --content-type image/jpeg
done
```

### Recommended folder structure in R2:

```
blogeusz-images/
├── photos/          # Photography gallery images
│   ├── portrait/
│   ├── macro/
│   ├── fashion/
│   └── events/
├── blog/            # Blog post cover images and inline images
└── og/              # Open Graph images
```

---

## 5. Reference Images in Content

In your content frontmatter, use the full CDN URL:

```yaml
---
# In photos collection
imageUrl: 'https://images.blogeusz.pl/photos/portrait/my-photo.jpg'
thumbnailUrl: 'https://images.blogeusz.pl/photos/portrait/my-photo-thumb.jpg'

# In blog collection
coverImage: 'https://images.blogeusz.pl/blog/my-post-cover.jpg'
images:
  - 'https://images.blogeusz.pl/blog/my-post-slide-1.jpg'
  - 'https://images.blogeusz.pl/blog/my-post-slide-2.jpg'
---
```

---

## 6. Image Optimization Tips

Cloudflare R2 + CDN serves images as-is. For best performance:

1. **Resize before uploading**: Use `sharp` or `ffmpeg` to create multiple sizes

   ```bash
   # Install sharp CLI
   npx sharp-cli --input ./original.jpg --output ./thumb.jpg resize 400
   ```

2. **Convert to WebP**: Modern browsers prefer WebP (typically 30-50% smaller)

   ```bash
   npx sharp-cli --input ./original.jpg --output ./image.webp
   ```

3. **Cloudflare Image Resizing** (Pro plan feature): Add resize params to URL
   ```
   https://images.blogeusz.pl/photos/portrait/photo.jpg?width=800&format=webp
   ```

---

## 7. Wrangler Pages Deploy

After your R2 bucket is set up, deploy to Cloudflare Pages:

```bash
# Build the site
pnpm build

# Deploy
wrangler pages deploy dist --project-name=blogeusz
```

Or connect your GitHub repo for automatic deployments:

- Go to **Cloudflare Pages → Create a project → Connect to Git**
- Build command: `pnpm build`
- Build output directory: `dist`
