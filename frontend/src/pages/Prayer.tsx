import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Clock } from 'lucide-react';
import PrayerForm from '@/components/PrayerForm';
import PrayerCard from '@/components/PrayerCard';

const Prayer = () => {
  const { t } = useTranslation();

  const prayerSchedule = t('prayer.scheduleItems', { returnObjects: true }) as Array<{
    day: string;
    time: string;
    type: string;
  }>;
  const samplePrayers = t('prayer.wall.samplePrayers', { returnObjects: true }) as Array<{
    name: string;
    request: string;
    date: string;
    isAnonymous?: boolean;
  }>;

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
              {t('prayer.title')}
            </h1>
            <div className="scripture-quote text-primary-foreground/90 border-secondary max-w-xl mx-auto">
              <p>"{t('prayer.subtitle')}"</p>
              <p className="text-secondary font-semibold mt-2">— {t('prayer.scripture')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prayer Content */}
      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Prayer Form */}
          <div>
            <PrayerForm />

            {/* How to Submit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 bg-secondary/10 rounded-xl p-6 border border-secondary/20"
            >
              <h3 className="font-heading text-lg font-bold text-primary mb-4">
                {t('prayer.otherWays')}
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">📞</span>
                  <span className="text-muted-foreground">
                    {t('prayer.call')}{' '}
                    <a href="tel:+251905543858" className="text-secondary hover:underline">
                      +251 90 554 3858
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✈️</span>
                  <span className="text-muted-foreground">
                    {t('prayer.telegram')}{' '}
                    <a
                      href="https://t.me/kingdomfamilyyy"
                      className="text-secondary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Telegram
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">📧</span>
                  <span className="text-muted-foreground">
                    {t('prayer.emailContact')}{' '}
                    <a
                      href="mailto:heavenonearthkingdomfamily@gmail.com"
                      className="text-secondary hover:underline"
                    >
                      heavenonearthkingdomfamily@gmail.com
                    </a>
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Prayer Schedule */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-card border border-border mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-secondary" />
                <h3 className="font-heading text-xl font-bold text-primary">
                  {t('prayer.schedule')}
                </h3>
              </div>
              <div className="space-y-4">
                {prayerSchedule.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.day}</p>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                    </div>
                    <span className="text-secondary font-medium text-sm">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Prayer Wall Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-6 border border-secondary/20"
            >
              <h3 className="font-heading text-xl font-bold text-primary mb-3">
                {t('prayer.commitment.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('prayer.commitment.body')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prayer Wall */}
      <section className="bg-muted py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">{t('prayer.wall.title')}</h2>
              <p className="section-subtitle">{t('prayer.wall.join')}</p>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {samplePrayers.map((prayer, index) => (
              <PrayerCard
                key={index}
                {...prayer}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Prayer;
