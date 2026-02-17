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

      {/* Bible Verses About Prayer */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-secondary/5 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Bible Verses About Prayer</h2>
              <p className="section-subtitle">Encouraging Scriptures to Strengthen Your Prayer Life</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                reference: 'Philippians 4:6-7',
                text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.'
              },
              {
                reference: '1 Thessalonians 5:16-18',
                text: 'Rejoice always, pray continually, give thanks in all circumstances; for this is God\'s will for you in Christ Jesus.'
              },
              {
                reference: 'James 5:16',
                text: 'Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous person is powerful and effective.'
              },
              {
                reference: 'Matthew 6:9-13',
                text: 'This, then, is how you should pray: "Our Father in heaven, hallowed be your name, your kingdom come, your will be done, on earth as it is in heaven..."'
              }
            ].map((verse, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, rotateX: 0, rotateY: 0, scale: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -5,
                  rotateX: 1,
                  rotateY: 1,
                  scale: 1.02,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                  rotateX: { duration: 0.2 },
                  rotateY: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform-gpu will-change-transform"
              >
                <motion.div
                  whileHover={{ color: '#4f46e5' }}
                  transition={{ duration: 0.2 }}
                  className="text-lg mb-4"
                >
                  "{verse.text}"
                </motion.div>
                <motion.p 
                  className="text-right font-medium text-primary"
                  whileHover={{ 
                    scale: 1.05,
                    x: -5
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  — {verse.reference}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Prayer;
