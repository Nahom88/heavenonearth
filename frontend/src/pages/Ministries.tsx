import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Users, BookOpen, Calendar, HandHeart, Music, Baby, Globe, LucideIcon, Church } from 'lucide-react';
import { getMinistries, Ministry } from '@/services/api';
import { toast } from 'sonner';

const Ministries = () => {
  const { t, i18n } = useTranslation();
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Map icon names from the backend to Lucide icon components
  const iconMap: { [key: string]: LucideIcon } = {
    Heart,
    HandHeart,
    BookOpen,
    Users,
    Calendar,
    Music,
    Baby,
    Globe,
    Church,
    Default: Heart, // Fallback icon
  };

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        // Fetch all active ministries
        const allMinistries = await getMinistries({ page_size: 100 });
        setMinistries(allMinistries);
      } catch (error) {
        console.error("Failed to fetch ministries:", error);
        toast.error(t('errors.fetchMinistries'));
      }
    };

    fetchMinistries();
  }, [t]);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Heart className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {t('ministries.title')}
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              {t('ministries.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="section-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {ministries.map((ministry, index) => {
            const MinistryIcon = iconMap[ministry.icon_name] || iconMap.Default;
            const title = i18n.language === 'am' && ministry.title_am ? ministry.title_am : ministry.title;
            const description = i18n.language === 'am' && ministry.description_am ? ministry.description_am : ministry.description;
            const activities = ministry.activities as string[] || [];

            return (
              <motion.div
                key={ministry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl shadow-card border border-border hover:border-secondary/30 transition-all duration-300 overflow-hidden group flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors">
                    <MinistryIcon className="w-7 h-7 text-secondary group-hover:text-secondary-foreground transition-colors" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {description}
                  </p>
                  {expandedIndex === index && Array.isArray(activities) && (
                    <ul className="space-y-2">
                      {activities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0 mt-[7px]" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {Array.isArray(activities) && activities.length > 0 && (
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-secondary hover:underline text-sm font-semibold"
                    >
                      {expandedIndex === index ? t('common.readLess') : t('common.readMore')}
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="bg-muted py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="section-title mb-4">{t('ministriesPage.getInvolved.title')}</h2>
            <p className="text-muted-foreground text-lg mb-8">
              {t('ministriesPage.getInvolved.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/partnership" className="btn-gold">
                {t('ministriesPage.getInvolved.volunteerCta')}
              </a>
              <a href="/contact" className="btn-navy">
                {t('ministriesPage.getInvolved.contactCta')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Ministries;
