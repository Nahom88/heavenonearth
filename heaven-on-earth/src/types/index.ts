// Common types used across the application

export interface Ministry {
  icon: React.ComponentType<{ className?: string }>;
  key: string;
  title?: string;
  description?: string;
}

export interface Event {
  id?: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

export interface NavLink {
  path: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavLink[];
}

export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
}
