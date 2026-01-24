import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Church, Users, BookOpen, Mic2, Music, HeartHandshake } from 'lucide-react';
import { ministries, hero } from './data';

const Ministries = () => {
  const { t } = useTranslation();

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{hero.title}</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              {hero.subtitle}
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ministries.map((ministry, index) => (
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
                      {ministry.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{ministry.title}</h3>
                    <p className="text-muted-foreground mb-4">{ministry.description}</p>
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      Learn more →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Ministries;
