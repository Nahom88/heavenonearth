import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
  featured?: boolean;
  delay?: number;
}

const EventCard = ({
  title,
  date,
  time,
  location,
  description,
  image,
  featured = false,
  delay = 0,
}: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border group"
    >
      {image ? (
        <div className="h-40 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className={`bg-gradient-to-r from-primary to-primary/90 p-4 text-primary-foreground ${featured ? 'bg-gradient-to-r from-secondary to-secondary/90' : ''}`}>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-secondary" />
          <span className="font-nav font-semibold">{date}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
          {title}
        </h3>
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-secondary" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-secondary" />
            <span>{location}</span>
          </div>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default EventCard;
