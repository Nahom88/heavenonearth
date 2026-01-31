import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, Calendar, BookOpen, HandHeart } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import logo from '@/assets/logo.png';
import MinistryCard from '@/components/MinistryCard';
import EventCard from '@/components/EventCard';
import TestimonialSection from '@/components/TestimonialSection';
import SeoHead from '@/components/SeoHead'; // Import SeoHead

const Home = () => {
  const { t } = useTranslation();

  // Define SEO properties for the Home page
  const homeTitle = t('hero.title'); // Using translation for title
  const homeDescription = t('hero.subtitle'); // Using translation for description
  const homeCanonicalUrl = 'https://heavenonearth.et/'; // Replace with actual domain

  const ministries = [
    { icon: Heart, key: 'prayer' },
    { icon: HandHeart, key: 'outreach' },
    { icon: BookOpen, key: 'discipleship' },
    { icon: Users, key: 'youth' },
    { icon: Calendar, key: 'children' },
  ];

  const featuredEvents = [
    {
      title: t('homePage.featuredEvents.sundayWorship.title'),
      date: t('homePage.featuredEvents.sundayWorship.date'),
      time: t('homePage.featuredEvents.sundayWorship.time'),
      location: t('homePage.featuredEvents.sundayWorship.location'),
      description: t('homePage.featuredEvents.sundayWorship.description'),
    },
    {
      title: t('homePage.featuredEvents.wednesdayPrayer.title'),
      date: t('homePage.featuredEvents.wednesdayPrayer.date'),
      time: t('homePage.featuredEvents.wednesdayPrayer.time'),
      location: t('homePage.featuredEvents.wednesdayPrayer.location'),
      description: t('homePage.featuredEvents.wednesdayPrayer.description'),
    },
    {
      title: t('homePage.featuredEvents.fridayYouth.title'),
      date: t('homePage.featuredEvents.fridayYouth.date'),
      time: t('homePage.featuredEvents.fridayYouth.time'),
      location: t('homePage.featuredEvents.fridayYouth.location'),
      description: t('homePage.featuredEvents.fridayYouth.description'),
    },
  ];

  return (
    <>
      <SeoHead
        title={homeTitle}
        description={homeDescription}
        canonicalUrl={homeCanonicalUrl}
        // You can add more Open Graph and Twitter Card properties here if needed
        ogTitle={homeTitle}
        ogDescription={homeDescription}
        ogImage="https://heavenonearth.et/images/og-image.jpg" // Example image
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
        <section className="section-container bg-background">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">{t('welcome.title')}</h2>
              <p className="text-secondary font-heading text-xl mb-6">{t('welcome.subtitle')}</p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {t('welcome.description')}
              </p>
              <Link to="/about" className="btn-navy inline-flex items-center gap-2">
                {t('welcome.cta')}
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-muted py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-8 shadow-card border border-border"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">{t('mission.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('mission.description')}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-8 shadow-card border border-border"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">{t('vision.title')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('vision.description')}</p>
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
            {ministries.map((ministry, index) => (
              <MinistryCard
                key={ministry.key}
                icon={ministry.icon}
                title={t(`ministries.${ministry.key}.title`)}
                description={t(`ministries.${ministry.key}.description`)}
                delay={index * 0.1}
              />
            ))}
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
              {featuredEvents.map((event, index) => (
                <EventCard
                  key={event.title}
                  {...event}
                  delay={index * 0.1}
                />
              ))}
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
