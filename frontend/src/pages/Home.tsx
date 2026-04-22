import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, Calendar, BookOpen, HandHeart, LucideIcon, Church } from 'lucide-react';
import { useEffect, useState } from 'react';
import heroBg from '@/assets/hero-bg.jpg';
import logo from '@/assets/logo.png';
import MinistryCard from '@/components/MinistryCard';
import EventCard from '@/components/EventCard';
import TestimonialSection from '@/components/TestimonialSection';
import SeoHead from '@/components/SeoHead';
import { getMinistries, Ministry, getEvents, Event } from '@/services/api';
import { toast } from 'sonner';
import { getCache, setCache } from '@/lib/cache';
import { format } from 'date-fns';

const MINISTRIES_CACHE_KEY = 'featured_ministries';
const EVENTS_CACHE_KEY = 'featured_events';
const CACHE_TTL_MINUTES = 5;

const Home = () => {
  const { t, i18n } = useTranslation();
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);

  const homeTitle = t('hero.title');
  const homeDescription = t('hero.subtitle');
  const homeCanonicalUrl = 'https://heavenonearth.et/';

  const iconMap: { [key: string]: LucideIcon } = {
    Heart, HandHeart, BookOpen, Users, Calendar, Church, Default: Heart,
  };

  useEffect(() => {
    const fetchMinistries = async () => {
      const cached = getCache<Ministry[]>(MINISTRIES_CACHE_KEY);
      if (cached) setMinistries(cached);
      try {
        const fresh = await getMinistries({ is_featured: true, page_size: 5 });
        setMinistries(fresh);
        setCache(MINISTRIES_CACHE_KEY, fresh, CACHE_TTL_MINUTES);
      } catch (error) {
        console.error("Failed to fetch ministries:", error);
        if (!cached) toast.error(t('errors.fetchMinistries'));
      }
    };

    const fetchEvents = async () => {
      const cached = getCache<Event[]>(EVENTS_CACHE_KEY);
      if (cached) setFeaturedEvents(cached);
      try {
        const fresh = await getEvents({ is_featured: true, page_size: 3 });
        setFeaturedEvents(fresh);
        setCache(EVENTS_CACHE_KEY, fresh, CACHE_TTL_MINUTES);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        if (!cached) toast.error(t('errors.fetchEvents'));
      }
    };

    fetchMinistries();
    fetchEvents();
  }, [t]);

  const formatEventTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    return format(date, 'p'); // e.g., 10:00 AM
  };

  return (
    <>
      <SeoHead
        title={homeTitle}
        description={homeDescription}
        canonicalUrl={homeCanonicalUrl}
        ogTitle={homeTitle}
        ogDescription={homeDescription}
        ogImage="https://heavenonearth.et/images/og-image.jpg"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
          <div className="hero-overlay" />

          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <motion.img
                src={logo}
                alt="Heaven on Earth Kingdom Family Ministries"
                className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-full shadow-gold-glow"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />

              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
                {t('hero.title')}
              </h1>

              <div className="scripture-quote text-primary-foreground/90 border-secondary max-w-xl mx-auto mb-8">
                <p className="text-lg md:text-xl leading-relaxed">"{t('hero.subtitle')}"</p>
                <p className="text-secondary font-semibold mt-2">— {t('hero.scripture')}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/about" className="btn-gold text-lg w-full sm:w-auto">
                  {t('hero.cta')}
                  <ArrowRight size={20} className="ml-2 inline" />
                </Link>
                <Link to="/ministries" className="btn-navy bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border border-primary-foreground/30 w-full sm:w-auto">
                  {t('hero.ctaSecondary')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="section-container bg-background relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -ml-32 -mt-32 blur-3xl opacity-50" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title text-navy mb-2">{t('welcome.title')}</h2>
              <p className="text-gold font-heading text-xl mb-12 tracking-widest uppercase">{t('welcome.subtitle')}</p>
              
              <div className="flex flex-col items-center gap-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-gold/10 relative max-w-3xl"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-navy text-white px-6 py-1 rounded-full text-sm font-bold tracking-tighter uppercase">
                    Our Calling
                  </div>
                  <h3 className="text-3xl font-bold text-navy mb-6">"Our name is our mission"</h3>
                  <div className="space-y-4 text-navy/80 text-xl font-serif italic mb-8">
                    <p className="leading-relaxed">
                      “Thy kingdom come. Thy will be done in earth, as it is in heaven.”
                    </p>
                    <p className="text-gold font-sans font-bold not-italic">— Matthew 6:10 (KJV)</p>
                  </div>
                  <div className="h-px w-full bg-gold/20 mb-8" />
                  <p className="text-muted-foreground text-lg leading-relaxed font-light">
                    We are a kingdom minded family committed to bringing the heart of the father to our world to see heaven on earth. We are longing to see the transformation of cities and nations through God's presence and His will.
                  </p>
                </motion.div>
                
                <Link to="/about" className="btn-gold py-4 px-12 rounded-full transition-all hover:scale-105 shadow-xl group text-lg font-bold">
                  {t('welcome.cta')}
                  <ArrowRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>        <section className="bg-navy py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 hover:border-gold/50 transition-all duration-500 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold transition-colors duration-500">
                    <svg className="w-8 h-8 text-gold group-hover:text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      <path d="M2 12h20" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-4xl font-bold text-white mb-6 tracking-tight">{t('mission.title')}</h3>
                  <p className="text-primary-foreground/80 text-xl leading-relaxed font-light italic">{t('mission.description')}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 hover:border-gold/50 transition-all duration-500 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold transition-colors duration-500">
                    <svg className="w-8 h-8 text-gold group-hover:text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-4xl font-bold text-white mb-6 tracking-tight">{t('vision.title')}</h3>
                  <p className="text-primary-foreground/80 text-xl leading-relaxed font-light italic">{t('vision.description')}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ministries Preview */}
        <section className="section-container">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">{t('ministries.title')}</h2>
              <p className="section-subtitle">{t('ministries.subtitle')}</p>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {ministries.map((ministry, index) => {
              const MinistryIcon = iconMap[ministry.icon_name] || iconMap.Default;
              const title = i18n.language === 'am' && ministry.title_am ? ministry.title_am : ministry.title;
              const description = i18n.language === 'am' && ministry.description_am ? ministry.description_am : ministry.description;
              
              return (
                <MinistryCard
                  key={ministry.id}
                  icon={MinistryIcon}
                  title={title}
                  description={description}
                  delay={index * 0.1}
                />
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/ministries" className="btn-navy inline-flex items-center gap-2">
              {t('common.viewAll')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Featured Events */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  {t('events.upcomingEvents')}
                </h2>
                <p className="text-primary-foreground/80 text-lg">{t('events.joinUs')}</p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {featuredEvents.map((event, index) => {
                const title = i18n.language === 'am' && event.title_am ? event.title_am : event.title;
                const location = i18n.language === 'am' && event.location_am ? event.location_am : event.location;
                const description = i18n.language === 'am' && event.description_am ? event.description_am : event.description;

                return (
                  <EventCard
                    key={event.id}
                    title={title}
                    date={format(new Date(event.event_date), 'E, MMM d')}
                    time={formatEventTime(event.start_time)}
                    location={location}
                    description={description}
                    delay={index * 0.1}
                  />
                );
              })}
            </div>

            <div className="text-center mt-10">
              <Link to="/events" className="btn-gold inline-flex items-center gap-2">
                {t('common.viewAllEvents')}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <TestimonialSection />

        {/* Prayer Call to Action */}
        <section className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-8 md:p-12 border border-secondary/20"
          >
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('prayer.title')}
            </h2>
            <p className="scripture-quote max-w-xl mx-auto mb-6">
              "{t('prayer.subtitle')}" — {t('prayer.scripture')}
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              {t('prayer.homePageDescription')}
            </p>
            <Link to="/prayer" className="btn-gold inline-flex items-center gap-2">
              {t('prayer.submitRequestButton')}
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </section>

        {/* How You Can Help */}
        <section className="bg-muted py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title">{t('help.title')}</h2>
              </motion.div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {[
                { label: t('help.pray'), icon: '🙏', link: '/prayer' },
                { label: t('help.give'), icon: '💝', link: '/giving' },
                { label: t('help.volunteer'), icon: '🤝', link: '/partnership' },
                { label: t('help.share'), icon: '📢', link: '/about' },
                { label: t('help.connect'), icon: '🔗', link: '/contact' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={item.link}
                    className="block bg-card p-6 rounded-xl text-center shadow-card hover:shadow-card-hover border border-border hover:border-secondary/30 transition-all duration-300 group"
                  >
                    <span className="text-3xl mb-3 block">{item.icon}</span>
                    <p className="text-sm font-medium text-foreground group-hover:text-secondary transition-colors">
                      {item.label}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
