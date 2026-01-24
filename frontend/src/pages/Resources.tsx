import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BookOpen, Download, ExternalLink } from 'lucide-react';

const Resources = () => {
  const { t } = useTranslation();

  const resources = [
    { title: 'Daily Devotional - January', description: 'Start your day with God through our monthly devotional guide.', type: 'PDF' },
    { title: 'Bible Study: Book of John', description: 'A 12-week study on the Gospel of John.', type: 'PDF' },
    { title: 'Prayer Guide', description: 'Learn how to develop a powerful prayer life.', type: 'PDF' },
    { title: 'Family Worship Guide', description: 'Resources for leading worship in your home.', type: 'PDF' },
    { title: 'New Believers Guide', description: 'Essential teachings for those new to the faith.', type: 'PDF' },
    { title: 'Fasting Guidelines', description: 'Biblical principles and practical tips for fasting.', type: 'PDF' },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
            <BookOpen className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">{t('nav.resources')}</h1>
            <p className="text-primary-foreground/80 text-lg">Grow deeper in your faith with our teaching resources</p>
          </motion.div>
        </div>
      </section>

      <section className="section-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {resources.map((resource, index) => (
            <motion.div key={resource.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="bg-card rounded-xl p-6 shadow-card border border-border hover:border-secondary/30 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary transition-colors">
                  <BookOpen className="w-6 h-6 text-secondary group-hover:text-secondary-foreground transition-colors" />
                </div>
                <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded">{resource.type}</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-primary mb-2">{resource.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
              <button className="flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium text-sm transition-colors">
                <Download className="w-4 h-4" /> Download
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Resources;
