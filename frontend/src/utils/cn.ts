import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * 
 * This combines clsx for conditional class handling with tailwind-merge
 * for proper Tailwind class deduplication and conflict resolution.
 * 
 * @param inputs - Class names to merge
 * @returns Merged class string
 * 
 * @example
 * ```typescript
 * cn('base-class', {
 *   'conditional-class': true,
 *   'another-class': false
 * }, 'additional-class')
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export default cn
