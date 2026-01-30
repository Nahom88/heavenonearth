import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Play, X } from 'lucide-react';

const Gallery = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const hero = {
    title: t('gallery.title'),
    subtitle: t('gallery.subtitle'),
  };
  const categories = t('gallery.categories', { returnObjects: true }) as Array<{ id: string; label: string }>;
  const galleryItems = t('gallery.items', { returnObjects: true }) as Array<{
    id: number;
    title: string;
    category: string;
    type: string;
    src: string;
    alt: string;
    date: string;
  }>;

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const formatDate = (dateString: string, options: Intl.DateTimeFormatOptions) => {
    return new Date(dateString).toLocaleDateString(i18n.language, options);
  };

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

      {/* Gallery Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.floor(index / 6) * 0.1 }}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="aspect-square overflow-hidden rounded-lg bg-muted relative">
                    {item.type === 'video' ? (
                      <div className="w-full h-full flex items-center justify-center bg-black/50">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      {item.type === 'video' ? (
                        <Play className="w-10 h-10 text-white" />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(item.date, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="max-w-4xl w-full">
            {selectedItem.type === 'video' ? (
              <div className="aspect-video">
                <iframe
                  src={selectedItem.src}
                  title={selectedItem.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={selectedItem.src}
                alt={selectedItem.alt}
                className="w-full max-h-[80vh] object-contain"
              />
            )}
            <div className="mt-4 text-white text-center">
              <h3 className="text-xl font-bold">{selectedItem.title}</h3>
              <p className="text-sm text-gray-300">
                {formatDate(selectedItem.date, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
