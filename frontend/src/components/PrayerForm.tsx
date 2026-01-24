import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

const PrayerForm = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    request: '',
    anonymous: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Prayer request submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', request: '', anonymous: false });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-xl p-8 shadow-card border border-border text-center"
      >
        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-heading text-xl font-bold text-primary mb-2">
          {t('common.success')}
        </h3>
        <p className="text-muted-foreground">
          Your prayer request has been submitted. Our team will be praying for you.
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
      className="bg-card rounded-xl p-6 shadow-card border border-border"
    >
      <h3 className="font-heading text-xl font-bold text-primary mb-6">
        {t('prayer.formTitle')}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="form-label">
            {t('prayer.namePlaceholder')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('prayer.namePlaceholder')}
            className="form-input"
            required={!formData.anonymous}
            disabled={formData.anonymous}
          />
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            {t('prayer.emailPlaceholder')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('prayer.emailPlaceholder')}
            className="form-input"
            required={!formData.anonymous}
            disabled={formData.anonymous}
          />
        </div>

        <div>
          <label htmlFor="request" className="form-label">
            Prayer Request
          </label>
          <textarea
            id="request"
            name="request"
            value={formData.request}
            onChange={handleChange}
            placeholder={t('prayer.requestPlaceholder')}
            rows={4}
            className="form-input resize-none"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="anonymous"
            name="anonymous"
            checked={formData.anonymous}
            onChange={handleChange}
            className="w-4 h-4 text-secondary border-border rounded focus:ring-secondary"
          />
          <label htmlFor="anonymous" className="text-sm text-foreground cursor-pointer">
            {t('prayer.anonymous')}
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-gold flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>{t('common.loading')}</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>{t('prayer.submit')}</span>
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
};

export default PrayerForm;
