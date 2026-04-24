/**
 * Application Constants
 */

// Local Storage Keys
export const STORAGE_KEYS = {
  DARK_MODE: 'darkMode',
  USER_PREFERENCES: 'userPreferences',
} as const;

// Resume File Names
export const RESUME_FILES = {
  DEFAULT: 'vmresume.pdf',
  DOWNLOAD_NAME: 'Vikash_Maskhare_Resume.pdf',
} as const;

// Social Links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/vikashmaskhare',
  LINKEDIN: 'https://www.linkedin.com/in/vikash-maskhare',
  TWITTER: 'https://twitter.com/vikashmaskhare',
  EMAIL: 'mailto:vikashmaskhare95@gmail.com',
} as const;

// Contact Information
export const CONTACT_INFO = {
  EMAIL: 'vikashmaskhare95@gmail.com',
  PHONE: '+91 9752004079',
  LOCATION: 'Bhopal, Madhya Pradesh, India',
} as const;

// Personal Information
export const PERSONAL_INFO = {
  NAME: 'Vikash Maskhare',
  TITLE: 'Software Engineer',
  TAGLINE: 'React & Angular Developer',
  EXPERIENCE_YEARS: '3+',
} as const;

// Animation Delays (in milliseconds)
export const ANIMATION_DELAYS = {
  SHORT: 1000,
  MEDIUM: 2000,
  LONG: 4000,
} as const;

export * from './routes';

