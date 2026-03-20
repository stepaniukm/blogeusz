import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import vue from '@astrojs/vue';

export default defineConfig({
  site: 'https://blogeusz.pl',
  output: 'static',
  i18n: {
    locales: ['pl', 'en'],
    defaultLocale: 'pl',
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    sitemap(),
    vue(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ['images.blogeusz.pl'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.r2.dev',
      },
    ],
  },
});
