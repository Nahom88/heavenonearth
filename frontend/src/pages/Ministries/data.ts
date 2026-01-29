import { Church, Users, BookOpen, Mic2, Music, HeartHandshake } from 'lucide-react';

export const hero = {
  // title and subtitle will be translated directly in Ministries/index.tsx
};

export const ministries = [
  {
    id: 'youth',
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 'worship',
    icon: <Music className="w-6 h-6" />,
  },
  {
    id: 'bible-study',
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: 'prayer',
    icon: <HeartHandshake className="w-6 h-6" />,
  },
  {
    id: 'outreach',
    icon: <HeartHandshake className="w-6 h-6" />,
  },
  {
    id: 'children',
    icon: <Church className="w-6 h-6" />,
  },
  {
    id: 'women',
    icon: <Users className="w-6 h-6" />, // Assuming Users icon for Women's Ministry
  },
  {
    id: 'missions',
    icon: <Mic2 className="w-6 h-6" />, // Assuming Mic2 icon for Missions
  },
];