import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";

const getUniqueTags = (posts: CollectionEntry<"blog">[]) => {
  const tags = posts
    .filter(({ data }) => !data.draft)
    .reduce((acc, post) => {
      post.data.tags.forEach(tag => acc.add(slugifyStr(tag)));

      return acc;
    }, new Set<string>());

  return Array.from(tags);
};

export default getUniqueTags;
