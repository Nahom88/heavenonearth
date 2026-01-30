import { Calendar, Clock, MapPin } from 'lucide-react';

export const serviceTimes = [
  { 
    day: 'Sunday', 
    service: 'Sunday Worship Service', 
    time: '9:00 AM - 12:00 PM',
    icon: Calendar,
  },
  { 
    day: 'Monday', 
    service: 'Morning Prayer', 
    time: '6:00 AM - 7:00 AM',
    icon: Clock,
  },
  { 
    day: 'Wednesday', 
    service: 'Midweek Prayer Meeting', 
    time: '6:00 PM - 8:00 PM',
    icon: Clock,
  },
  { 
    day: 'Friday', 
    service: 'Bible Study & Youth Fellowship', 
    time: '5:00 PM - 7:00 PM',
    icon: Calendar,
  },
  { 
    day: 'Saturday', 
    service: 'Prayer & Fasting (1st Sat)', 
    time: '6:00 AM - 12:00 PM',
    icon: Clock,
  },
];

export const upcomingEvents = [
  {
    id: 'event-1',
    translationKey: 'christmasPrayerNight',
    title: 'Christmas Prayer Night',
    date: 'December 25, 2024',
    time: '6:00 PM',
    location: 'Main Sanctuary',
    description: 'Join us for a special night of prayer and worship as we celebrate the birth of our Savior.',
    image: '/images/events/christmas.jpg',
    featured: true,
  },
  {
    id: 'event-2',
    translationKey: 'newYearsEveService',
    title: 'New Year\'s Eve Service',
    date: 'December 31, 2024',
    time: '10:00 PM',
    location: 'Main Sanctuary',
    description: 'Watch night service with communion and prayer for the new year.',
    image: '/images/events/new-year.jpg',
    featured: true,
    category: 'worship',
  },
  {
    id: 'event-3',
    translationKey: 'baptismSunday',
    title: 'Baptism Sunday',
    date: 'January 5, 2025',
    time: '9:00 AM',
    location: 'Main Sanctuary',
    description: 'Celebration of new believers being baptized in water.',
    image: '/images/events/baptism.jpg',
    featured: true,
    category: 'worship',
  },
];

export const hero = {
  title: 'Upcoming Events',
  subtitle: 'Join us for worship, prayer, and fellowship',
};

export const eventCategories = [
  { id: 'all', name: 'All Events' },
  { id: 'worship', name: 'Worship Services' },
  { id: 'prayer', name: 'Prayer Meetings' },
  { id: 'biblestudy', name: 'Bible Studies' },
  { id: 'special', name: 'Special Events' },
];
