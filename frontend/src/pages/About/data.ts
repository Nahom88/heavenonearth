import { MapPin, Clock, Users, Target, Eye } from 'lucide-react';

const aboutData = {
  mission: {
    icon: Target,
  },
  vision: {
    icon: Eye,
  },
  stats: [
    {
      icon: MapPin,
      value: '3',
      key: 'locations', // Use key for translation
    },
    {
      icon: Users,
      value: '500+',
      key: 'members', // Use key for translation
    },
    {
      icon: Clock,
      value: '15+',
      key: 'yearsOfService', // Use key for translation
    },
  ],
  beliefs: [
    { key: 'bible' },
    { key: 'trinity' },
    { key: 'salvation' },
    { key: 'church' },
    { key: 'returnOfChrist' },
  ],
  team: [
    { key: 'pastorAbraham' },
    { key: 'sisterTigist' },
    { key: 'brotherDaniel' },
  ],
};

export default aboutData;