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
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
        "img-src 'self' https://images.blogeusz.pl https://*.r2.dev",
        "font-src 'self' https://fonts.gstatic.com data:",
        "frame-src 'self' https://giscus.app",
        "connect-src 'self'",
        "upgrade-insecure-requests",
      ],
      styleDirective: {
        resources: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      },
    },
  },
});
