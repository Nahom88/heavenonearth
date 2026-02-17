import { LucideIcon } from 'lucide-react';

export interface Ministry {
  id: string; // UUID from backend will be string in frontend
  title: string;
  title_am?: string;
  description: string;
  description_am?: string;
  icon_name: string; // This will be the string name of the icon, not the component itself
  ministry_key: string;
  image_url?: string;
  activities?: Record<string, any>; // Using Record<string, any> for Dict[str, Any]
  schedule?: Record<string, any>; // Using Record<string, any> for Dict[str, any>
}

// Existing types...