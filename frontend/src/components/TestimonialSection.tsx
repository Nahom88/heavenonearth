'use client';

import { useState, useEffect } from 'react';
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
import { getTestimonials, Testimonial } from '@/services/api';
import { getCache, setCache } from '@/lib/cache';
import { Loader2 } from 'lucide-react';

const CACHE_KEY = 'published_testimonials';
const CACHE_TTL_MINUTES = 5;

const categoryEmojis: Record<string, string> = {
  healing: '🙌',
  salvation: '✝️',
  provision: '💝',
  deliverance: '🕊️',
  general: '✨',
  Prayer: '🙏', // Added from backend schema
  General: '✨', // Added from backend schema
};

const categoryColors: Record<string, string> = {
  healing: 'bg-blue-100 text-blue-800',
  salvation: 'bg-green-100 text-green-800',
  provision: 'bg-purple-100 text-purple-800',
  deliverance: 'bg-red-100 text-red-800',
  general: 'bg-gray-100 text-gray-800',
  Prayer: 'bg-yellow-100 text-yellow-800',
  General: 'bg-gray-100 text-gray-800',
};

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchPublishedTestimonials = async () => {
      const cached = getCache<Testimonial[]>(CACHE_KEY);
      if (cached) {
        setTestimonials(cached);
        setIsLoading(false);
      }

      try {
        const fresh = await getTestimonials(); // Backend filters for approved for unauthenticated users
        setTestimonials(fresh);
        setCache(CACHE_KEY, fresh, CACHE_TTL_MINUTES);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        if (!cached) {
          toast.error(t('errors.fetchTestimonials'));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublishedTestimonials();
  }, [t]);

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

  return (
    <section className="py-16 bg-white" id="testimonials">
      <div className="container mx-auto px-4 text-center">
        {/* Translation keys for these can be found in i18n/en.json and i18n/am.json */}
        <h2 className="text-3xl font-bold mb-4">{t('testimonial.sectionTitle')}</h2>
        <p className="text-xl text-muted-foreground mb-12">
          {t('testimonial.sectionSubtitle')}
        </p>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 h-full flex flex-col"
              >
                <div className="text-4xl mb-4">
                  {categoryEmojis[testimonial.category] || '✨'}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {i18n.language === 'am' && testimonial.title ? testimonial.title : testimonial.title}
                </h3>
                <p className="text-muted-foreground mb-4 italic flex-grow">
                  "{i18n.language === 'am' && testimonial.content ? testimonial.content : testimonial.content}"
                </p>
                <div>
                  <p className="text-right text-sm text-gray-500">— {testimonial.name}</p>
                  {testimonial.location && (
                    <p className="text-right text-xs text-gray-400">{testimonial.location}</p>
                  )}
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
            <p className="text-muted-foreground">{t('testimonial.noTestimonials')}</p>
          </div>
        )}

        <div className="mt-12">
          {/* The text for 'testimonial.ctaText' can be modified in your i18n/en.json and i18n/am.json files */}
          <p className="text-lg text-muted-foreground">
            {t('testimonial.ctaText')}
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button  className="mt-6">
                {t('testimonial.shareYourStory')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t('testimonial.shareYourStory')}</DialogTitle>
              </DialogHeader>
              <TestimonialForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
