import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@config";
import slugify from "@utils/slugify";

export async function GET() {
	const posts = await getCollection("blog", ({ data }) => !data.draft);
	return rss({
		title: SITE.title,
		description: SITE.desc,
		site: SITE.website,
		items: posts.map(({ data }) => ({
			link: `posty/${slugify(data)}`,
			title: data.title,
			description: data.description,
			pubDate: new Date(data.pubDatetime),
		})),
	});
}
