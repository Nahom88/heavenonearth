import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Play, X } from 'lucide-react';
import { getGallery, Gallery as GalleryItemType } from '@/services/api';
import { getCache, setCache } from '@/lib/cache';
import { toast } from 'sonner';
import { format } from 'date-fns';

const CACHE_KEY = 'all_gallery_items';
const CACHE_TTL_MINUTES = 15;

// Static categories matching the backend schema
const galleryCategories = [
  { id: 'all', label: 'All' },
  { id: 'worship', label: 'Worship' },
  { id: 'outreach', label: 'Outreach' },
  { id: 'youth', label: 'Youth' },
  { id: 'events', label: 'Events' },
  { id: 'general', label: 'General' },
];

const Gallery = () => {
  const { t, i18n } = useTranslation();
  const [galleryItems, setGalleryItems] = useState<GalleryItemType[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItemType | null>(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      const cached = getCache<GalleryItemType[]>(CACHE_KEY);
      if (cached) {
        setGalleryItems(cached);
      }
      try {
        const fresh = await getGallery({ page_size: 100 });
        setGalleryItems(fresh);
        setCache(CACHE_KEY, fresh, CACHE_TTL_MINUTES);
      } catch (error) {
        console.error("Failed to fetch gallery items:", error);
        if (!cached) {
          toast.error(t('errors.fetchGalleryItems'));
        }
      }
    };
    fetchGalleryItems();
  }, [t]);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const formatDate = (dateString: string | undefined, options: Intl.DateTimeFormatOptions) => {
    if (!dateString) return '';
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('gallery.title')}</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              {t('gallery.subtitle')}
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
              {galleryCategories.map((category) => (
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
              {filteredItems.map((item, index) => {
                const title = i18n.language === 'am' && item.title_am ? item.title_am : item.title;
                const altText = item.alt_text;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.floor(index / 6) * 0.1 }}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="aspect-square overflow-hidden rounded-lg bg-muted relative">
                      {item.media_type === 'video' ? (
                        <div className="w-full h-full flex items-center justify-center bg-black/50">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      ) : (
                        <img
                          src={item.src_url}
                          alt={altText}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        {item.media_type === 'video' ? (
                          <Play className="w-10 h-10 text-white" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium text-sm">{title}</h3>
                      {item.event_date && (
                        <p className="text-xs text-muted-foreground">
                          {formatDate(item.event_date, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
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
            {selectedItem.media_type === 'video' ? (
              <div className="aspect-video">
                <iframe
                  src={selectedItem.src_url}
                  title={selectedItem.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={selectedItem.src_url}
                alt={selectedItem.alt_text}
                className="w-full max-h-[80vh] object-contain"
              />
            )}
            <div className="mt-4 text-white text-center">
              <h3 className="text-xl font-bold">{i18n.language === 'am' && selectedItem.title_am ? selectedItem.title_am : selectedItem.title}</h3>
              {selectedItem.event_date && (
                <p className="text-sm text-gray-300">
                  {formatDate(selectedItem.event_date, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
