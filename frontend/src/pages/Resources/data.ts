export const hero = {
  title: 'Resources',
  subtitle: 'Explore our collection of sermons, articles, and worship resources',
};

export const resourceCategories = [
  { id: 'all', name: 'All Resources' },
  { id: 'sermons', name: 'Sermons' },
  { id: 'bible-study', name: 'Bible Studies' },
  { id: 'worship', name: 'Worship' },
  { id: 'devotionals', name: 'Devotionals' },
  { id: 'kids', name: 'Kids' },
  { id: 'youth', name: 'Youth' },
];

export const sermons = [
  {
    id: 'sermon-1',
    title: 'Walking in Faith',
    speaker: 'Pastor John Smith',
    date: '2024-01-21',
    category: 'sermons',
    description: 'Learning to trust God in every step of our journey through life.',
    image: '/images/sermons/faith.jpg',
    videoUrl: 'https://youtube.com/embed/example1',
    audioUrl: '/audio/sermons/walking-in-faith.mp3',
  },
  {
    id: 'sermon-2',
    title: 'The Power of Prayer',
    speaker: 'Pastor Sarah Johnson',
    date: '2024-01-14',
    category: 'sermons',
    description: 'Discovering the transformative power of a consistent prayer life.',
    image: '/images/sermons/prayer.jpg',
    videoUrl: 'https://youtube.com/embed/example2',
    audioUrl: '/audio/sermons/power-of-prayer.mp3',
  },
  {
    id: 'sermon-3',
    title: 'Living with Purpose',
    speaker: 'Guest Speaker Michael Brown',
    date: '2024-01-07',
    category: 'sermons',
    description: 'Finding and fulfilling God\'s purpose for your life.',
    image: '/images/sermons/purpose.jpg',
    videoUrl: 'https://youtube.com/embed/example3',
    audioUrl: '/audio/sermons/living-with-purpose.mp3',
  },
];

export const blogPosts = [
  {
    id: 'blog-1',
    title: '5 Ways to Deepen Your Prayer Life',
    slug: '5-ways-to-deepen-your-prayer-life',
    excerpt: 'Practical tips to help you grow in your prayer life and strengthen your relationship with God.',
    content: 'Full blog post content goes here...',
    author: 'Sarah Johnson',
    authorImage: '/images/authors/sarah-johnson.jpg',
    date: '2024-01-18',
    category: 'devotionals',
    image: '/images/blog/prayer-life.jpg',
    readTime: '5 min read',
  },
  {
    id: 'blog-2',
    title: 'Understanding God\'s Love',
    slug: 'understanding-gods-love',
    excerpt: 'Exploring the depth and breadth of God\'s unconditional love for us.',
    content: 'Full blog post content goes here...',
    author: 'Michael Chen',
    authorImage: '/images/authors/michael-chen.jpg',
    date: '2024-01-11',
    category: 'bible-study',
    image: '/images/blog/gods-love.jpg',
    readTime: '7 min read',
  },
  {
    id: 'blog-3',
    title: 'Raising Faith-Filled Kids',
    slug: 'raising-faith-filled-kids',
    excerpt: 'Practical advice for nurturing your children\'s spiritual growth in today\'s world.',
    content: 'Full blog post content goes here...',
    author: 'Emily Wilson',
    authorImage: '/images/authors/emily-wilson.jpg',
    date: '2024-01-04',
    category: 'kids',
    image: '/images/blog/faith-kids.jpg',
    readTime: '8 min read',
  },
];

export const worshipMusic = [
  {
    id: 'album-1',
    title: 'In Your Presence',
    artist: 'Kingdom Worship',
    year: '2023',
    cover: '/images/music/in-your-presence.jpg',
    tracks: [
      { id: 't1', title: 'Holy Spirit Come', duration: '4:32' },
      { id: 't2', title: 'In Your Presence', duration: '5:18' },
      { id: 't3', title: 'Great Are You Lord', duration: '4:56' },
    ],
  },
  {
    id: 'album-2',
    title: 'Faithful God',
    artist: 'Grace Collective',
    year: '2023',
    cover: '/images/music/faithful-god.jpg',
    tracks: [
      { id: 't4', title: 'Faithful God', duration: '4:15' },
      { id: 't5', title: 'No One Like You', duration: '3:48' },
      { id: 't6', title: 'Your Love Never Fails', duration: '4:22' },
    ],
  },
  {
    id: 'album-3',
    title: 'Praise & Worship',
    artist: 'Sanctuary Choir',
    year: '2022',
    cover: '/images/music/praise-worship.jpg',
    tracks: [
      { id: 't7', title: 'How Great Is Our God', duration: '5:42' },
      { id: 't8', title: '10,000 Reasons', duration: '4:18' },
      { id: 't9', title: 'Goodness of God', duration: '4:56' },
    ],
  },
  {
    id: 'album-4',
    title: 'Hymns of Faith',
    artist: 'Kingdom Choir',
    year: '2022',
    cover: '/images/music/hymns-of-faith.jpg',
    tracks: [
      { id: 't10', title: 'Amazing Grace', duration: '3:52' },
      { id: 't11', title: 'How Great Thou Art', duration: '4:27' },
      { id: 't12', title: 'It Is Well', duration: '4:10' },
    ],
  },
];
