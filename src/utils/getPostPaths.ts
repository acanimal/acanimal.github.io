/**
 * Builds the public URL for a post. Live routes stay under /blog/ (not
 * upstream's /posts/) to preserve existing links, backlinks, and RSS entries.
 */
export function getPostUrl(id: string): string {
  return `/blog/${id}/`;
}
