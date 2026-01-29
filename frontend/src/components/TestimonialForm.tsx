import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface TestimonialFormProps {
  onSuccess?: () => void;
}

const TestimonialForm = ({ onSuccess }: TestimonialFormProps) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    content: '',
    category: 'general',
  });

  const categories = [
    { value: 'healing', label: t('testimonial.categories.healing') },
    { value: 'salvation', label: t('testimonial.categories.salvation') },
    { value: 'provision', label: t('testimonial.categories.provision') },
    { value: 'deliverance', label: t('testimonial.categories.deliverance') },
    { value: 'general', label: t('testimonial.categories.general') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!formData.name || !formData.content) {
        toast.error('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      console.log('Submitting testimonial:', formData);
      
      const response = await fetch('/api/v1/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          title: formData.title || 'Personal Testimony',
          content: formData.content,
          category: formData.category,
          ...(formData.email && { email: formData.email }),
          ...(formData.phone && { phone: formData.phone }),
          ...(formData.location && { location: formData.location })
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit testimonial');
      }

      // Handle success
      toast.success('Thank you for sharing your testimony! It will be reviewed and posted soon.');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        title: '',
        content: '',
        category: 'general',
      });
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-xl p-8 shadow-card border border-border text-center max-w-2xl mx-auto"
      >
        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-primary mb-2">
          {t('testimonial.thankYou')}
        </h3>
        <p className="text-muted-foreground">
          {t('testimonial.submitSuccess')}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="bg-card rounded-xl p-6 shadow-card border border-border w-full max-w-2xl mx-auto"
    >
      <h3 className="font-heading text-2xl font-bold text-primary mb-6 text-center">
        {t('testimonial.shareYourStory')}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="form-label">
            {t('common.name')} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('common.namePlaceholder')}
            className="form-input w-full"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="form-label">
              {t('common.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('common.emailPlaceholder')}
              className="form-input w-full"
            />
          </div>
          <div>
            <label htmlFor="phone" className="form-label">
              {t('common.phone')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('common.phonePlaceholder')}
              className="form-input w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="form-label">
              {t('common.location')}
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder={t('common.locationPlaceholder')}
              className="form-input w-full"
            />
          </div>
          <div>
            <label htmlFor="category" className="form-label">
              {t('testimonial.category')}
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select w-full"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="title" className="form-label">
            {t('common.title')}
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={t('testimonial.titlePlaceholder')}
            className="form-input w-full"
          />
        </div>

        <div>
          <label htmlFor="content" className="form-label">
            {t('testimonial.yourStory')} *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder={t('testimonial.contentPlaceholder')}
            rows={6}
            className="form-textarea w-full resize-none"
            required
            minLength={50}
          />
          <p className="text-sm text-muted-foreground mt-1">
            {t('testimonial.minLength', { count: 50 })}
          </p>
        </div>

        <div className="pt-2">
          <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>{t('common.submitting')}</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>{t('testimonial.submitButton')}</span>
              </>
            )}
          </button>
        </div>
        </div>
      </div>
    </motion.form>
  );
};

export default TestimonialForm;
