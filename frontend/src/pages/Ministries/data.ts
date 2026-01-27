import { Church, Users, BookOpen, Mic2, Music, HeartHandshake } from 'lucide-react';

export const hero = {
  title: 'Our Ministries',
  subtitle: 'Discover how you can get involved and grow in your faith journey',
};

export const ministries = [
  {
    id: 'youth',
    title: 'Youth Ministry',
    description: 'Engaging programs for teenagers to grow in their faith and build strong relationships.',
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 'worship',
    title: 'Worship Team',
    description: 'Leading the congregation in heartfelt worship through music and praise.',
    icon: <Music className="w-6 h-6" />,
  },
  {
    id: 'bible-study',
    title: 'Bible Study',
    description: 'In-depth study of God\'s Word in a small group setting.',
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: 'prayer',
    title: 'Prayer Ministry',
    description: 'Dedicated to intercessory prayer for the church and community needs.',
    icon: <HeartHandshake className="w-6 h-6" />,
  },
  {
    id: 'outreach',
    title: 'Outreach',
    description: 'Serving our community and sharing the love of Christ through practical acts of service.',
    icon: <HeartHandshake className="w-6 h-6" />,
  },
  {
    id: 'children',
    title: 'Children\'s Ministry',
    description: 'Nurturing the faith of our youngest members through fun and engaging activities.',
    icon: <Church className="w-6 h-6" />,
  },
];
