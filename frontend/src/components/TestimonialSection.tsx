'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import TestimonialForm from './TestimonialForm';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  content: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

const categoryEmojis: Record<string, string> = {
  healing: '🙌',
  salvation: '✝️',
  provision: '💝',
  deliverance: '🕊️',
  general: '✨',};

const categoryColors: Record<string, string> = {
  healing: 'bg-blue-100 text-blue-800',
  salvation: 'bg-green-100 text-green-800',
  provision: 'bg-purple-100 text-purple-800',
  deliverance: 'bg-red-100 text-red-800',
  general: 'bg-gray-100 text-gray-800'
};

function getRandomTestimonials(testimonials: Testimonial[], count: number): Testimonial[] {
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Static testimonial data
const staticTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    title: 'Life-Changing Experience',
    content: 'This ministry has completely transformed my spiritual journey. The teachings are powerful and life-changing.',
    category: 'salvation',
    status: 'approved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'John D.',
    title: 'Healing Testimony',
    content: 'I was healed from chronic pain after the prayer team ministered to me. God is truly a healer!',
    category: 'healing',
    status: 'approved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Amina K.',
    title: 'Financial Breakthrough',
    content: 'After tithing faithfully, God has blessed my business beyond what I could imagine.',
    category: 'provision',
    status: 'approved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export default function TestimonialSection() {
  const [testimonials] = useState<Testimonial[]>(staticTestimonials);
  const isLoading = false;
  const error = null;

  if (isLoading) {
    return (
      <section className="py-16 bg-white" id="testimonials">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <div className="h-10 w-10 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white" id="testimonials">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white" id="testimonials">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Testimonies of Faith</h2>
        <p className="text-xl text-muted-foreground mb-12">
          Stories of God's Faithfulness in Our Lives
        </p>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
              >
                <div className="text-4xl mb-4">
                  {categoryEmojis[testimonial.category] || '✨'}
                </div>
                <h3 className="text-xl font-semibold mb-2">{testimonial.title}</h3>
                <p className="text-muted-foreground mb-4 italic flex-grow">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="text-right text-sm text-gray-500">— {testimonial.name}</p>
                  <span
                    className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${categoryColors[testimonial.category] || 'bg-gray-100 text-gray-800'}`}
                  >
                    {testimonial.category.charAt(0).toUpperCase() + testimonial.category.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12">
            <p className="text-muted-foreground">No testimonies to display. Check back later!</p>
          </div>
        )}

        <div className="mt-12">
          <p className="text-lg text-muted-foreground">
            God is doing amazing things in our community. Come and see for yourself!
          </p>
        </div>
      </div>
    </section>
  );
}
