import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { ministries } from './data'; // REMOVED: No longer using hardcoded data

import { getMinistries } from '../../services/api'; // Import API function
import { Ministry } from '../../types'; // Import Ministry interface

// Dynamically import all Lucide icons
import * as LucideIcons from 'lucide-react';

// Helper to get Lucide icon component by name
const getLucideIcon = (iconName: string) => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.HeartHandshake; // Default icon if not found
};

const Ministries = () => {
  const { t } = useTranslation();
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        setLoading(true);
        const fetchedMinistries = await getMinistries();
        setMinistries(fetchedMinistries);
      } catch (err) {
        console.error("Failed to fetch ministries:", err);
        setError("Failed to load ministries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMinistries();
  }, []);

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('ministriesPage.hero.title')}</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              {t('ministriesPage.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            {loading && <p className="text-center text-lg">{t('common.loading')}...</p>}
            {error && <p className="text-center text-red-500 text-lg">{error}</p>}
            {!loading && !error && ministries.length === 0 && (
              <p className="text-center text-lg">{t('ministriesPage.noMinistriesFound')}</p>
            )}
            {!loading && !error && ministries.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ministries.map((ministry, index) => {
                  const IconComponent = getLucideIcon(ministry.icon_name); // Get icon component
                  return (
                    <motion.div
                      key={ministry.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-border"
                    >
                      <div className="p-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                          <IconComponent className="w-6 h-6" /> {/* Render dynamic icon */}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{ministry.title}</h3> {/* Use fetched title */}
                        <p className="text-muted-foreground mb-4">{ministry.description}</p> {/* Use fetched description */}
                        <Link to={`/ministries/${ministry.ministry_key}`} className="text-primary hover:text-primary/80 text-sm font-medium">
                          {t('common.readMore')} →
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">{t('ministriesPage.getInvolved.title')}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('ministriesPage.getInvolved.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/partnership" className="btn-gold text-lg">
                {t('ministriesPage.getInvolved.volunteerCta')}
              </Link>
              <Link to="/contact" className="btn-navy bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border border-primary-foreground/30">
                {t('ministriesPage.getInvolved.contactCta')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Ministries;