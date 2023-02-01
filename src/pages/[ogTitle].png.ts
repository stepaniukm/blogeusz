import { getCollection } from "astro:content";
import generateOgImage from "@utils/generateOgImage";
import type { APIRoute } from "astro";

export const get: APIRoute = async ({ params }) => {
  const pngBuffer = await generateOgImage(params.ogTitle);

  const headers = new Headers();

  headers.set("Content-Type", "image/png");
  headers.set("Cache-Control", "max-age=1, stale-while-revalidate=59");

  return new Response(pngBuffer, { headers });
};

const postImportResult = await getCollection("blog", ({ data }) => !data.draft);
const posts = Object.values(postImportResult);

export function getStaticPaths() {
  return posts
    .filter(({ data }) => !data.ogImage)
    .map(({ data }) => ({
      params: { ogTitle: data.title },
    }));
}
