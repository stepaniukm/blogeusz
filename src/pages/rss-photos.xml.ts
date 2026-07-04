import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const photos = await getCollection('photos', ({ data }) => data.public);

  const items = photos
    .map((photo) => {
      const imageUrl = new URL(photo.data.imageUrl, context.site).href;
      const description = [photo.data.category, photo.data.location].filter(Boolean).join(' · ');

      return {
        title: photo.data.title,
        pubDate: photo.data.publishedAt,
        description: description || photo.data.title,
        link: `/${photo.data.lang}/photos/${photo.id}/`,
        categories: [photo.data.category, ...photo.data.tags],
        content: `<img src="${imageUrl}" alt="${photo.data.title}" />`,
      };
    })
    .toSorted((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'blogeusz - fotografia',
    description: 'Galeria fotografii - portrety, makro, moda i więcej.',
    site: context.site!,
    items,
    customData: `<language>pl-PL</language>`,
  });
}
