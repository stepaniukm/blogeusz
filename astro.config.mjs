// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
// Note: @astrojs/cloudflare adapter is added when deploying with SSR features.
// For static output, `wrangler pages deploy dist` handles Cloudflare Pages deployment.
export default defineConfig({
  site: 'https://blogeusz.pl',
  output: 'static',
  integrations: [
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Allow remote images from Cloudflare R2 CDN
    domains: ['images.blogeusz.pl'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.r2.dev',
      },
    ],
  },
});
