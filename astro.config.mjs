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
  server: {
    host: '0.0.0.0',
  },
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
  build: {
    inlineStylesheets: 'never',
  },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
        "img-src 'self' https://images.blogeusz.pl https://*.r2.dev https://*.goatcounter.com",
        "font-src 'self' https://fonts.gstatic.com data:",
        "frame-src 'self' https://giscus.app",
        "connect-src 'self' https://cloudflareinsights.com https://*.goatcounter.com",
        'upgrade-insecure-requests',
      ],
      scriptDirective: {
        resources: [
          "'self'",
          'data:',
          'https://static.cloudflareinsights.com',
          'https://gc.zgo.at',
        ],
      },
      styleDirective: {
        resources: ["'self'", 'https://fonts.googleapis.com'],
      },
    },
  },
});
