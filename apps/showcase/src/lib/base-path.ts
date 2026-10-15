/** The docs site serves this app under /showcase. */
export const BASE_PATH = "/showcase";

/**
 * Prefixes a file in `public`. `Link` adds the base path on its own, but
 * image and media URLs don't.
 */
export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}
