import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blogs = await getCollection('blog', ({ data }) => !data.draft && data.public);

  const items = blogs
    .map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/${post.data.lang}/blog/${post.id}/`,
      categories: post.data.tags,
    }))
    .toSorted((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'blogeusz',
    description: 'Blog o programowaniu i fotografii.',
    site: context.site!,
    items,
    customData: `<language>pl-PL</language>`,
  });
}
