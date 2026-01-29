import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import aboutData from './data';
import SeoHead from '@/components/SeoHead';

const About = () => {
  const { t } = useTranslation();
  const { mission, vision, stats, beliefs, team } = aboutData;

  // Define SEO properties for the About page
  const aboutTitle = `${t('aboutPage.hero.title')} | Heaven on Earth Kingdom Family Ministries`;
  const aboutDescription = t('aboutPage.hero.description');
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('aboutPage.hero.title')}</h1>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                {t('aboutPage.hero.description')}
              </p>
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
              <p className="text-muted-foreground">
                {t('aboutPage.beliefs.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beliefs.map((belief, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-3">{t(`aboutPage.beliefs.${belief.key}.title`)}</h3>
                  <p className="text-muted-foreground">{t(`aboutPage.beliefs.${belief.key}.description`)}</p>
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