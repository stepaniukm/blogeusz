/**
 * Estimate reading time from raw text/markdown content.
 * @param text Raw content string
 * @param wpm Words per minute (default 200)
 */
export function getReadingTime(text: string, wpm = 200): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
}

/**
 * Format a date using Polish locale.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Collect all unique tags from a list of blog/TIL posts.
 */
export function collectTags(posts: { data: { tags: string[] } }[]): string[] {
  const set = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      set.add(tag);
    }
  }
  return Array.from(set).sort();
}
