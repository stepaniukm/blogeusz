import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderPostOgImage } from '../../../../lib/og';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => data.public || data.draft);
  return posts.map((post) => ({
    params: { lang: post.data.lang, slug: post.id },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;

  const png = await renderPostOgImage({
    title: post.data.title,
    category: post.data.category,
    tags: post.data.tags,
    publishedAt: post.data.publishedAt,
    locale: post.data.lang,
  });

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
