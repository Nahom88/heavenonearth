import { Clock, Users, Calendar } from 'lucide-react';

export const hero = {
  title: 'Prayer',
  subtitle: 'Join us in prayer and submit your prayer requests',
};

export const prayerTimes = [
  {
    name: 'Morning Prayer',
    time: '6:00 AM - 7:00 AM',
    icon: Clock,
  },
  {
    name: 'Midday Prayer',
    time: '12:00 PM - 1:00 PM',
    icon: Clock,
  },
  {
    name: 'Evening Prayer',
    time: '6:00 PM - 7:00 PM',
    icon: Clock,
  },
  {
    name: 'Night Prayer',
    time: '9:00 PM - 10:00 PM',
    icon: Clock,
  },
  {
    name: 'Friday Prayer Meeting',
    time: '7:00 PM - 8:30 PM',
    icon: Users,
  },
  {
    name: 'Sunday Service Prayer',
    time: '8:30 AM - 9:30 AM',
    icon: Calendar,
  },
];

export const prayerRequests = [
  {
    id: 1,
    name: 'John D.',
    request: 'Pray for healing for my mother who is recovering from surgery.',
    date: '2024-02-15',
  },
  {
    id: 2,
    name: 'Sarah M.',
    request: 'Pray for wisdom and guidance in my new job.',
    date: '2024-02-14',
  },
  {
    id: 3,
    name: 'Michael T.',
    request: 'Pray for peace and comfort during this difficult time.',
    date: '2024-02-13',
  },
];
