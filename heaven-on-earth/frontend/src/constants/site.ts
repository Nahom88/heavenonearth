// Site-wide constants
export const SITE = {
  name: 'Heaven on Earth Kingdom Family Ministries',
  description: 'A place of worship, prayer, and community',
  url: 'https://heavenonearthministries.org',
  author: 'Heaven on Earth Ministries',
  defaultLocale: 'en',
  locales: ['en', 'am'], // English and Amharic
} as const;

// Navigation links
export const NAV_LINKS = [
  { path: '/', label: 'nav.home' },
  { path: '/about', label: 'nav.about' },
  { path: '/ministries', label: 'nav.ministries' },
  { path: '/events', label: 'nav.events' },
  { path: '/prayer', label: 'nav.prayer' },
  { path: '/partnership', label: 'nav.partnership' },
  { path: '/giving', label: 'nav.giving' },
  { path: '/gallery', label: 'nav.gallery' },
  { path: '/contact', label: 'nav.contact' },
] as const;
