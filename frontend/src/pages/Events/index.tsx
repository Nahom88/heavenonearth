import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';
import EventCard from '@/components/EventCard';
import { getEvents, Event } from '@/services/api';
import { getCache, setCache } from '@/lib/cache';
import { toast } from 'sonner';
import { serviceTimes } from './data'; // Keep service times as they might be static

const CACHE_KEY = 'all_events';
const CACHE_TTL_MINUTES = 15;

// Static categories matching the backend schema
const eventCategories = [
  { id: 'all', name: 'All' },
  { id: 'worship', name: 'Worship' },
  { id: 'prayer', name: 'Prayer' },
  { id: 'biblestudy', name: 'Bible Study' },
  { id: 'youth', name: 'Youth' },
  { id: 'special', name: 'Special' },
];

const Events = () => {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      const cached = getCache<Event[]>(CACHE_KEY);
      if (cached) {
        setEvents(cached);
      }
      try {
        const fresh = await getEvents({ page_size: 100 });
        setEvents(fresh);
        setCache(CACHE_KEY, fresh, CACHE_TTL_MINUTES);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        if (!cached) {
          toast.error(t('errors.fetchEvents'));
        }
      }
    };
    fetchEvents();
  }, [t]);

  const filteredEvents = activeCategory === 'all'
    ? events
    : events.filter((event) => event.category === activeCategory);

  const formatEventTime = (timeStr: string) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    return format(date, 'p'); // e.g., 10:00 AM
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('events.upcomingEvents')}</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              {t('events.joinUs')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-8">{t('events.serviceTimes.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {serviceTimes.map((time, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-6 rounded-lg shadow-sm border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <time.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{t(`events.serviceTimes.${time.day.toLowerCase()}.day`)}</h3>
                      <p className="text-muted-foreground">{t(`events.serviceTimes.${time.day.toLowerCase()}.event`)}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-4 h-4" />
                        {t(`events.serviceTimes.${time.day.toLowerCase()}.time`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">{t('events.upcomingEvents')}</h2>
              <div className="flex gap-2 mt-4 md:mt-0 flex-wrap justify-center">
                {eventCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {t(`events.filters.${category.id}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => {
                const title = i18n.language === 'am' && event.title_am ? event.title_am : event.title;
                const location = i18n.language === 'am' && event.location_am ? event.location_am : event.location;
                const description = i18n.language === 'am' && event.description_am ? event.description_am : event.description;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <EventCard
                      title={title}
                      date={format(new Date(event.event_date), 'E, MMM d')}
                      time={formatEventTime(event.start_time)}
                      location={location}
                      description={description}
                      image={event.image_url}
                      featured={event.is_featured}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Events;
