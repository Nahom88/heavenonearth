import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+251 90 554 3858',
    href: 'tel:+251905543858',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'heavenonearthkingdomfamily@gmail.com',
    href: 'mailto:heavenonearthkingdomfamily@gmail.com',
  },
  {
    icon: MessageCircle,
    label: 'Telegram',
    value: '@kingdomfamilyyy',
    href: 'https://t.me/kingdomfamilyyy',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Bole Road, Addis Ababa, Ethiopia',
    href: '#map',
  },
];

export const officeHours = [
  { day: 'Monday - Friday', time: '9:00 AM - 5:00 PM' },
  { day: 'Saturday', time: '10:00 AM - 2:00 PM' },
  { day: 'Sunday', time: 'Worship Service' },
];

export const bankDetails = {
  bank: 'Commercial Bank of Ethiopia',
  account: '1000345678901',
  swift: 'CBETETAA',
};

export const hero = {
  title: 'Get In Touch',
  subtitle: 'We would love to hear from you. Reach out to us with any questions or prayer requests.'
};

export const mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.78!3d9.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMzYuMCJOIDM4wrA0Nic0OC4wIkU!5e0!3m2!1sen!2set!4v1';

export const formFields = {
  name: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
  email: {
    label: 'Email Address',
    placeholder: 'Enter your email',
  },
  phone: {
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
  },
  subject: {
    label: 'Subject',
    placeholder: 'What is this regarding?',
  },
  message: {
    label: 'Your Message',
    placeholder: 'How can we help you?',
  },
  submit: 'Send Message',
  success: 'Thank you for your message! We will get back to you soon.',
  };
