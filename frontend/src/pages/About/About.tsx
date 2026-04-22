import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import aboutData from './data';
import SeoHead from '@/components/SeoHead';

const About = () => {
  const { t } = useTranslation();
  const { mission, vision, stats, beliefs, team } = aboutData;

  // Define SEO properties for the About page
  const aboutTitle = `${t('aboutPage.hero.title')} | Heaven on Earth Kingdom Family Ministries`;
  const aboutDescription = `${t('aboutPage.hero.hook')}. ${t('aboutPage.hero.commitment')}`;
  const aboutCanonicalUrl = 'https://heavenonearth.et/about'; // Replace with actual domain

  return (
    <>
      <SeoHead
        title={aboutTitle}
        description={aboutDescription}
        canonicalUrl={aboutCanonicalUrl}
        ogTitle={aboutTitle}
        ogDescription={aboutDescription}
        ogImage="https://heavenonearth.et/images/og-image.jpg" // Example image
      />
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
              <h1 className="text-4xl md:text-6xl font-bold mb-8">{t('aboutPage.hero.title')}</h1>
              
              <div className="max-w-4xl mx-auto space-y-10">
                <motion.p 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-heading font-medium text-gold italic border-y border-gold/30 py-4 inline-block"
                >
                  "{t('aboutPage.hero.hook')}"
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
                  <p className="text-xl md:text-3xl font-serif italic mb-4 leading-relaxed">
                    {t('aboutPage.hero.scripture.text')}
                  </p>
                  <p className="text-lg text-primary-foreground/80 font-bold tracking-wider uppercase">
                    {t('aboutPage.hero.scripture.ref')}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="grid md:grid-cols-2 gap-10 text-lg md:text-xl text-primary-foreground/90 leading-relaxed text-left"
                >
                  <div className="relative pl-6 border-l-2 border-white/10">
                    <p>{t('aboutPage.hero.commitment')}</p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-white/10">
                    <p>{t('aboutPage.hero.vision')}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Us Section (Our Story) */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-6">{t('aboutPage.story.title')}</h2>
              <p className="text-lg text-muted-foreground">
                {t('aboutPage.story.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <mission.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{t('mission.title')}</h3>
                </div>
                <p className="text-muted-foreground">
                  {t('mission.description')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <vision.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{t('vision.title')}</h3>
                </div>
                <p className="text-muted-foreground">
                  {t('vision.description')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Beliefs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">{t('aboutPage.beliefs.title')}</h2>
              <p className="text-muted-foreground text-lg italic max-w-2xl mx-auto">
                {t('aboutPage.beliefs.subtitle')}
              </p>
            </motion.div>
 
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beliefs.map((belief, index) => {
                const Icon = belief.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all border border-navy/5 group"
                  >
                    <div className="mb-4 p-3 bg-primary/5 rounded-lg w-fit group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-navy">{t(`aboutPage.beliefs.${belief.key}.title`)}</h3>
                    <p className="text-muted-foreground leading-relaxed italic">{t(`aboutPage.beliefs.${belief.key}.description`)}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-12 text-center p-6 bg-primary/5 rounded-xl border border-primary/10 max-w-3xl mx-auto"
            >
              <p className="text-primary font-medium italic">
                {t('aboutPage.beliefs.footer')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-navy text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gold">{t('aboutPage.values.title')}</h2>
              <p className="text-primary-foreground/80 text-lg">
                {t('aboutPage.values.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-xl font-bold mb-4 text-gold uppercase tracking-wider">{t(`aboutPage.values.${value.key}.title`)}</h3>
                  <p className="text-primary-foreground/90 leading-relaxed mb-4">{t(`aboutPage.values.${value.key}.description`)}</p>
                  {t(`aboutPage.values.${value.key}.scripture`) && (
                    <div className="pt-4 border-t border-gold/20">
                      <p className="text-sm font-serif italic text-gold/90">
                        {t(`aboutPage.values.${value.key}.scripture`)}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">{t('aboutPage.team.title')}</h2>
              <p className="text-muted-foreground">
                {t('aboutPage.team.subtitle')}
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary mb-4">
                    {t(`aboutPage.team.${member.key}.name`).split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-semibold">{t(`aboutPage.team.${member.key}.name`)}</h3>
                  <p className="text-primary font-medium mb-2">{t(`aboutPage.team.${member.key}.role`)}</p>
                  <p className="text-muted-foreground">{t(`aboutPage.team.${member.key}.description`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-muted-foreground">{t(`aboutPage.stats.${stat.key}`)}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;