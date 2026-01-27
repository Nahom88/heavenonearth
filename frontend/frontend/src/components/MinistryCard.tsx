import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MinistryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

const MinistryCard = ({ title, description, icon: Icon, delay = 0 }: MinistryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-secondary/30"
    >
      <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
        <Icon className="w-7 h-7 text-secondary group-hover:text-secondary-foreground transition-colors duration-300" />
      </div>
      <h3 className="font-heading text-xl font-bold text-primary mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default MinistryCard;
