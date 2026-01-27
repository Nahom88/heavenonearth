import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

const PartnershipForm = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    partnershipType: '',
    message: '',
  });

  const partnershipTypes = [
    { value: 'financial', label: t('partnership.financial') },
    { value: 'volunteer', label: t('partnership.volunteer') },
    { value: 'material', label: t('partnership.material') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Partnership form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', partnershipType: '', message: '' });
    }, 3000);
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
          Thank you for your interest in partnering with us. We'll be in touch soon!
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
        Become a Partner
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="form-input"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+251..."
              className="form-input"
            />
          </div>
        </div>

        <div>
          <label htmlFor="partnershipType" className="form-label">
            Partnership Type
          </label>
          <select
            id="partnershipType"
            name="partnershipType"
            value={formData.partnershipType}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select a type...</option>
            {partnershipTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us how you'd like to partner..."
            rows={4}
            className="form-input resize-none"
          />
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
              <span>{t('common.submit')}</span>
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
};

export default PartnershipForm;
