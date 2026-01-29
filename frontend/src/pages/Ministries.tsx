import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Users, BookOpen, Calendar, HandHeart, Music, Baby, Globe } from 'lucide-react';
import MinistryCard from '@/components/MinistryCard';

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const Ministries = () => {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const ministries = [
    {
      icon: Heart,
      title: t('ministries.prayer.title'),
      description: t('ministries.prayer.description'),
      details: [
        'ministries.prayer.details.0',
        'ministries.prayer.details.1',
        'ministries.prayer.details.2',
        'ministries.prayer.details.3',
      ],
    },
    {
      icon: HandHeart,
      title: t('ministries.outreach.title'),
      description: t('ministries.outreach.description'),
      details: [
        'ministries.outreach.details.0',
        'ministries.outreach.details.1',
        'ministries.outreach.details.2',
        'ministries.outreach.details.3',
      ],
    },
    {
      icon: BookOpen,
      title: t('ministries.discipleship.title'),
      description: t('ministries.discipleship.description'),
      details: [
        'ministries.discipleship.details.0',
        'ministries.discipleship.details.1',
        'ministries.discipleship.details.2',
        'ministries.discipleship.details.3',
      ],
    },
    {
      icon: Users,
      title: t('ministries.youth.title'),
      description: t('ministries.youth.description'),
      details: [
        'ministries.youth.details.0',
        'ministries.youth.details.1',
        'ministries.youth.details.2',
        'ministries.youth.details.3',
      ],
    },
    {
      icon: Baby,
      title: t('ministries.children.title'),
      description: t('ministries.children.description'),
      details: [
        'ministries.children.details.0',
        'ministries.children.details.1',
        'ministries.children.details.2',
        'ministries.children.details.3',
      ],
    },
    {
      icon: Music,
      title: t('ministries.worship.title'),
      description: t('ministries.worship.description'),
      details: [
        'ministries.worship.details.0',
        'ministries.worship.details.1',
        'ministries.worship.details.2',
        'ministries.worship.details.3',
      ],
    },
    {
      icon: Calendar,
      title: t('ministries.women.title'),
      description: t('ministries.women.description'),
      details: [
        'ministries.women.details.0',
        'ministries.women.details.1',
        'ministries.women.details.2',
        'ministries.women.details.3',
      ],
    },
    {
      icon: Globe,
      title: t('ministries.missions.title'),
      description: t('ministries.missions.description'),
      details: [
        'ministries.missions.details.0',
        'ministries.missions.details.1',
        'ministries.missions.details.2',
        'ministries.missions.details.3',
      ],
    },
  ];

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
          {ministries.map((ministry, index) => (
            <motion.div
              key={ministry.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-card rounded-xl shadow-card border border-border hover:border-secondary/30 transition-all duration-300 overflow-hidden group max-w-max ${expandedIndex === index ? 'w-full' : ''}`}
            >
              <div className="p-6">
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors">
                  <ministry.icon className="w-7 h-7 text-secondary group-hover:text-secondary-foreground transition-colors" />
                </div>
                <h3 className="font-heading text-xl font-bold text-primary mb-2">
                  {ministry.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {ministry.description}
                </p>
                {expandedIndex === index && (
                  {ministry.details.map((detailKey, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0" />
                      {t(detailKey)}
                    </li>
                  ))}
                )}
                {ministry.details.length > 0 && (
                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-secondary hover:underline"
                  >
                    {expandedIndex === index ? t('common.readLess') : t('common.readMore')}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
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
