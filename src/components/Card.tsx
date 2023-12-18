import { Datetime } from "./Datetime";
import type { BlogFrontmatter } from "@content/_schemas";
import { ReadingTime } from "./ReadingTime";
import { component$ } from "@builder.io/qwik";

export interface Props {
	href?: string;
	frontmatter: BlogFrontmatter;
	secHeading?: boolean;
	readingTime: number;
}

export const Card = component$(({ href, frontmatter, readingTime, secHeading = true }: Props) => {
	const { title, pubDatetime, description } = frontmatter;
	return (
		<li class="my-6">
			<a
				href={href}
				class="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
			>
				{secHeading ? (
					<h2 class="text-lg font-medium decoration-dashed hover:underline">{title}</h2>
				) : (
					<h3 class="text-lg font-medium decoration-dashed hover:underline">{title}</h3>
				)}
			</a>
			<Datetime datetime={pubDatetime} />
			<ReadingTime readingTime={readingTime} size="sm" />
			<p>{description}</p>
		</li>
	);
});
