import { LucideIcon, MapPin, Users, Clock, Target, Eye } from 'lucide-react';

export interface Belief {
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image?: string;
}

export interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface AboutData {
  hero: {
    title: string;
    description: string;
  };
  aboutUs: {
    title: string;
    description: string;
  };
  beliefs: Belief[];
  team: TeamMember[];
  stats: StatItem[];
  mission: {
    title: string;
    description: string;
    icon: LucideIcon;
  };
  vision: {
    title: string;
    description: string;
    icon: LucideIcon;
  };
}

const aboutData: AboutData = {
  hero: {
    title: 'About Our Ministry',
    description: 'Discover our story, beliefs, and the team behind Heaven on Earth Kingdom Family Ministries',
  },
  aboutUs: {
    title: 'Our Story',
    description: 'Heaven on Earth Kingdom Family Ministries was founded in 2005 with a vision to create a place where people can experience the love and power of God in their lives.'
  },
  beliefs: [
    { 
      title: 'The Bible', 
      description: 'We believe the Bible is the inspired, infallible Word of God, the supreme authority for faith and life.' 
    },
    { 
      title: 'The Trinity', 
      description: 'We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.' 
    },
    { 
      title: 'Salvation', 
      description: 'We believe salvation is by grace through faith in Jesus Christ alone, not by works.' 
    },
    { 
      title: 'The Church', 
      description: 'We believe in the universal church as the body of Christ, called to worship, fellowship, and mission.' 
    },
    { 
      title: 'The Return of Christ', 
      description: 'We believe in the personal, visible return of Jesus Christ to establish His Kingdom.' 
    },
  ],
  team: [
    { 
      name: 'Pastor Abraham', 
      role: 'Senior Pastor', 
      description: 'Leading our congregation with vision and compassion for over 15 years.' 
    },
    { 
      name: 'Sister Tigist', 
      role: 'Women\'s Ministry Leader', 
      description: 'Dedicated to empowering women through faith and fellowship.' 
    },
    { 
      name: 'Brother Daniel', 
      role: 'Youth Pastor', 
      description: 'Passionate about raising the next generation of believers.' 
    },
  ],
  stats: [
    { 
      icon: MapPin, 
      value: '3', 
      label: 'Locations' 
    },
    { 
      icon: Users, 
      value: '500+', 
      label: 'Members' 
    },
    { 
      icon: Clock, 
      value: '15+', 
      label: 'Years of Service' 
    },
  ],
  mission: {
    title: 'Our Mission',
    description: 'To lead people into a growing relationship with Jesus Christ through authentic worship, biblical teaching, and compassionate service.',
    icon: Target
  },
  vision: {
    title: 'Our Vision',
    description: 'To be a Spirit-filled, multi-generational community that transforms lives through the power of the Gospel.',
    icon: Eye
  }
};

export default aboutData;
