import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PrayerCardProps {
  name: string;
  request: string;
  date: string;
  isAnonymous?: boolean;
  delay?: number;
}

const PrayerCard = ({ name, request, date, isAnonymous = false, delay = 0 }: PrayerCardProps) => {
  const { t } = useTranslation();
  const [prayerCount, setPrayerCount] = useState(0);
  const [hasPrayed, setHasPrayed] = useState(false);

  const handlePray = () => {
    if (!hasPrayed) {
      setPrayerCount(prev => prev + 1);
      setHasPrayed(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      className="bg-card rounded-xl p-5 shadow-card border border-border"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-heading font-semibold text-primary">
            {isAnonymous ? t('prayer.anonymous') : name}
          </h4>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </div>
      <p className="text-sm text-foreground leading-relaxed mb-4">
        {request}
      </p>
      <button
        onClick={handlePray}
        disabled={hasPrayed}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          hasPrayed
            ? 'bg-secondary/20 text-secondary cursor-default'
            : 'bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground'
        }`}
      >
        <Heart size={16} className={hasPrayed ? 'fill-current' : ''} />
        <span>{hasPrayed ? t('prayer.wall.prayed') : t('prayer.wall.iPrayed')}</span>
        {prayerCount > 0 && (
          <span className="ml-1 px-2 py-0.5 bg-secondary/20 rounded-full text-xs">
            {prayerCount}
          </span>
        )}
      </button>
    </motion.div>
  );
};

export default PrayerCard;
