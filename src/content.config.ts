import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['Dev', 'Fotografia']).default('Dev'),
    coverImage: z.string().optional(),
    images: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    lang: z.string().default('pl'),
  }),
});

const til = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/til' }),
  schema: z.object({
    title: z.string(),
    publishedAt: z.coerce.date(),
    type: z.enum(['note', 'link']).default('note'),
    url: z.url().optional(),
    annotation: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    lang: z.string().default('pl'),
  }),
});

const photos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/photos' }),
  schema: z.object({
    title: z.string(),
    publishedAt: z.coerce.date(),
    imageUrl: z.string(),
    thumbnailUrl: z.string().optional(),
    category: z.string(),
    location: z.string().optional(),
    camera: z.string().optional(),
    lens: z.string().optional(),
    settings: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    lang: z.string().default('pl'),
  }),
});

export const collections = { blog, til, photos };
