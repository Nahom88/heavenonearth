import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Users, BookOpen, Calendar, HandHeart, Music, Baby, Globe } from 'lucide-react';
import MinistryCard from '@/components/MinistryCard';

const Ministries = () => {
  const { t } = useTranslation();

  const ministries = [
    {
      icon: Heart,
      title: t('ministries.prayer.title'),
      description: t('ministries.prayer.description'),
      details: [
        '24/7 Prayer Coverage',
        'Weekly Prayer Vigils',
        'Intercession Team',
        'Prayer Chain Network',
      ],
    },
    {
      icon: HandHeart,
      title: t('ministries.outreach.title'),
      description: t('ministries.outreach.description'),
      details: [
        'Food Distribution',
        'Community Support',
        'Hospital Visitation',
        'Street Evangelism',
      ],
    },
    {
      icon: BookOpen,
      title: t('ministries.discipleship.title'),
      description: t('ministries.discipleship.description'),
      details: [
        'New Believers Class',
        'Bible Study Groups',
        'One-on-One Mentoring',
        'Leadership Training',
      ],
    },
    {
      icon: Users,
      title: t('ministries.youth.title'),
      description: t('ministries.youth.description'),
      details: [
        'Friday Youth Fellowship',
        'Youth Choir',
        'Mentorship Program',
        'Annual Youth Conference',
      ],
    },
    {
      icon: Baby,
      title: t('ministries.children.title'),
      description: t('ministries.children.description'),
      details: [
        'Sunday School (Ages 3-12)',
        'Children\'s Choir',
        'Vacation Bible School',
        'Kids Prayer Club',
      ],
    },
    {
      icon: Music,
      title: 'Worship Ministry',
      description: 'Leading the congregation in Spirit-filled worship through music and arts.',
      details: [
        'Main Worship Team',
        'Choir',
        'Sound & Media Team',
        'Dance Ministry',
      ],
    },
    {
      icon: Calendar,
      title: 'Women\'s Ministry',
      description: 'Empowering women to grow in faith and support one another in community.',
      details: [
        'Women\'s Bible Study',
        'Monthly Fellowship',
        'Prayer Breakfasts',
        'Annual Women\'s Retreat',
      ],
    },
    {
      icon: Globe,
      title: 'Missions',
      description: 'Spreading the Gospel to unreached communities in Ethiopia and beyond.',
      details: [
        'Church Planting',
        'Missionary Support',
        'Short-term Mission Trips',
        'Partnership with Local Churches',
      ],
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
              className="bg-card rounded-xl shadow-card border border-border hover:border-secondary/30 transition-all duration-300 overflow-hidden group"
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
                <ul className="space-y-2">
                  {ministry.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
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
            <h2 className="section-title mb-4">Get Involved</h2>
            <p className="text-muted-foreground text-lg mb-8">
              God has given each of us unique gifts and talents. We'd love to help you discover your calling and find a place to serve in our church family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/partnership" className="btn-gold">
                Become a Volunteer
              </a>
              <a href="/contact" className="btn-navy">
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Ministries;
