import Datetime from "./Datetime";
import type { BlogFrontmatter } from "@content/_schemas";
import ReadingTime from "./ReadingTime";

export interface Props {
  href?: string;
  frontmatter: BlogFrontmatter;
  secHeading?: boolean;
  readingTime: number;
}

export default function Card({
  href,
  frontmatter,
  readingTime,
  secHeading = true,
}: Props) {
  const { title, pubDatetime, description } = frontmatter;
  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 className="text-lg font-medium decoration-dashed hover:underline">
            {title}
          </h2>
        ) : (
          <h3 className="text-lg font-medium decoration-dashed hover:underline">
            {title}
          </h3>
        )}
      </a>
      <Datetime datetime={pubDatetime} />
      <ReadingTime readingTime={readingTime} size="sm" />
      <p>{description}</p>
    </li>
  );
}
