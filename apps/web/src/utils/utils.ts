/**
 * Common utility functions used across the application
 */

/**
 * Get Tailwind CSS classes for difficulty badge based on difficulty level
 * @param difficulty - The difficulty level (Beginner, Intermediate, Advanced)
 * @returns Tailwind CSS classes for the difficulty badge
 */
export const getDifficultyColor = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | string): string => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'Advanced':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

