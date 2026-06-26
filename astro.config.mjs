import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import vue from '@astrojs/vue';
import { unified } from '@astrojs/markdown-remark';

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
      processor: unified({
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      }),
    }),
    sitemap(),
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag.includes('-') },
      },
    }),
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
