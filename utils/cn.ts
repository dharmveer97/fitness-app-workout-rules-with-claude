/**
 * Simple className merger utility
 * Alternative to tailwind-merge for combining CSS classes
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim();
}

export default cn;