import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const [blogs, tils] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('til', ({ data }) => !data.draft),
  ]);

  const blogItems = blogs.map((post) => ({
    title: post.data.title,
    pubDate: post.data.publishedAt,
    description: post.data.description,
    link: `/blog/${post.id}/`,
    categories: post.data.tags,
  }));

  const tilItems = tils.map((item) => ({
    title: item.data.title,
    pubDate: item.data.publishedAt,
    description: item.data.annotation || item.data.title,
    link: item.data.type === 'link' && item.data.url ? item.data.url : `/til/${item.id}/`,
    categories: item.data.tags,
  }));

  const items = [...blogItems, ...tilItems].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
  );

  return rss({
    title: 'blogeusz',
    description: 'Blog o programowaniu i fotografii.',
    site: context.site!,
    items,
    customData: `<language>pl-PL</language>`,
  });
}
