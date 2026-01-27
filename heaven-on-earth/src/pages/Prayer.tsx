import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Clock } from 'lucide-react';
import PrayerForm from '@/components/PrayerForm';
import PrayerCard from '@/components/PrayerCard';

const Prayer = () => {
  const { t } = useTranslation();

  const prayerSchedule = [
    { day: 'Monday', time: '6:00 AM - 7:00 AM', type: 'Morning Prayer' },
    { day: 'Wednesday', time: '6:00 PM - 8:00 PM', type: 'Corporate Prayer' },
    { day: 'Friday', time: '10:00 PM - 12:00 AM', type: 'Night Vigil' },
    { day: 'Saturday (1st)', time: '6:00 AM - 12:00 PM', type: 'Fasting & Prayer' },
  ];

  const samplePrayers = [
    {
      name: 'Sister Meron',
      request: 'Please pray for my mother who is in the hospital. We are trusting God for complete healing.',
      date: 'January 20, 2025',
      isAnonymous: false,
    },
    {
      name: 'Anonymous',
      request: 'Praying for breakthrough in my job search. I have been looking for 6 months now.',
      date: 'January 19, 2025',
      isAnonymous: true,
    },
    {
      name: 'Brother Dawit',
      request: 'Please intercede for my family\'s salvation. My parents don\'t know the Lord yet.',
      date: 'January 18, 2025',
      isAnonymous: false,
    },
    {
      name: 'Sister Hanna',
      request: 'Pray for peace in our community and protection over our children.',
      date: 'January 17, 2025',
      isAnonymous: false,
    },
  ];

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
                Other Ways to Submit Prayer Requests
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">📞</span>
                  <span className="text-muted-foreground">
                    Call us at <a href="tel:+251905543858" className="text-secondary hover:underline">+251 90 554 3858</a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✈️</span>
                  <span className="text-muted-foreground">
                    Message us on <a href="https://t.me/kingdomfamilyyy" className="text-secondary hover:underline" target="_blank" rel="noopener noreferrer">Telegram</a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">📧</span>
                  <span className="text-muted-foreground">
                    Email <a href="mailto:heavenonearthkingdomfamily@gmail.com" className="text-secondary hover:underline">heavenonearthkingdomfamily@gmail.com</a>
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
                Our Prayer Commitment
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Every prayer request submitted is prayed over by our dedicated prayer team. 
                We believe in the power of intercessory prayer and are committed to standing 
                with you in faith. Your requests are kept confidential and handled with love and care.
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
              <h2 className="section-title">{t('prayer.wall')}</h2>
              <p className="section-subtitle">Join us in praying for our community</p>
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
