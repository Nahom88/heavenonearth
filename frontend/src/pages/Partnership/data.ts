import { Handshake, Globe, Users, Heart, Briefcase, Gift } from 'lucide-react';

export const hero = {
  title: 'Partnership',
  subtitle: 'Join us in our mission to spread hope and make a difference together',
};

export const partnershipOptions = [
  {
    id: 'church',
    title: 'Church Partnership',
    description: 'Partner with us as a church to support our missions and outreach programs.',
    icon: <Handshake className="w-6 h-6" />,
  },
  {
    id: 'business',
    title: 'Business Partnership',
    description: 'Align your business with our mission through sponsorships and collaborative projects.',
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    id: 'missionary',
    title: 'Missionary Support',
    description: 'Support our missionaries around the world through prayer and financial giving.',
    icon: <Globe className="w-6 h-6" />,
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    description: 'Donate your time and skills to support our various ministries and events.',
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 'donate',
    title: 'Financial Donation',
    description: 'Make a one-time or recurring financial contribution to support our work.',
    icon: <Gift className="w-6 h-6" />,
  },
];

export const benefits = [
  {
    title: 'Impact Lives',
    description: 'Your partnership directly impacts lives through our various ministries and outreach programs.',
  },
  {
    title: 'Tax Deductible',
    description: 'All financial contributions are tax-deductible to the fullest extent of the law.',
  },
  {
    title: 'Regular Updates',
    description: 'Receive regular updates about the impact of your partnership and how it\'s making a difference.',
  },
  {
    title: 'Networking Opportunities',
    description: 'Connect with like-minded individuals and organizations who share your passion for making a difference.',
  },
  {
    title: 'Recognition',
    description: 'Be recognized for your partnership through our various communication channels (optional).',
  },
];
