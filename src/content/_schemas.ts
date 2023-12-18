import { z } from "astro:content";

export const blogSchema = z
	.object({
		author: z.string(),
		pubDatetime: z.date(),
		title: z.string(),
		postSlug: z.string().optional(),
		featured: z.boolean().optional(),
		draft: z.boolean().optional(),
		tags: z.array(z.string()).default(["inne"]),
		ogImage: z.string().optional(),
		description: z.string(),
	})
	.strict();

export const tilSchema = z
	.object({
		date: z.date(),
		tags: z.array(z.string()).default(["inne"]),
		description: z.string().optional(),
	})
	.strict();

export type BlogFrontmatter = z.infer<typeof blogSchema>;
export type TILFrontmatter = z.infer<typeof tilSchema>;
