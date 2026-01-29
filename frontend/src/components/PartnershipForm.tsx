import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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
    volunteerAreas: '',
    financialCommitment: '',
    materialItems: '',
  });

  const partnershipTypes = [
    { value: 'financial', label: t('partnership.financial') },
    { value: 'volunteer', label: t('partnership.volunteer') },
    { value: 'material', label: t('partnership.material') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare payload
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      partnership_type: formData.partnershipType,
      message: formData.message || undefined,
      volunteer_areas: formData.volunteerAreas ? formData.volunteerAreas.split(',').map(s => s.trim()) : undefined,
      financial_commitment: formData.financialCommitment ? JSON.parse(formData.financialCommitment) : undefined,
      material_items: formData.materialItems ? formData.materialItems.split(',').map(s => s.trim()) : undefined,
    };

    try {
      const response = await fetch('/api/v1/partnerships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit partnership application');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', partnershipType: '', message: '', volunteerAreas: '', financialCommitment: '', materialItems: '' });
    } catch (error) {
      console.error(error);
      alert('There was an error submitting the form. Please try again later.');
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
        className="bg-card rounded-xl p-8 shadow-card border border-border text-center"
      >
        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-heading text-xl font-bold text-primary mb-2">
          {t('partnership.successTitle')}
        </h3>
        <p className="text-muted-foreground">
          {t('partnership.successMessage')}
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
        {t('partnership.title')}
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
              {t('common.email')} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('common.emailPlaceholder')}
              className="form-input w-full"
              required
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

        <div>
          <label htmlFor="partnershipType" className="form-label">
            {t('partnership.type')} *
          </label>
          <select
            id="partnershipType"
            name="partnershipType"
            value={formData.partnershipType}
            onChange={handleChange}
            className="form-select w-full"
            required
          >
            <option value="">{t('partnership.selectType')}</option>
            {partnershipTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="form-label">
            {t('common.message')}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t('partnership.messagePlaceholder')}
            rows={4}
            className="form-textarea w-full resize-none"
          />
        </div>

        <div>
          <label htmlFor="volunteerAreas" className="form-label">
            {t('partnership.volunteerAreas')}
          </label>
          <input
            type="text"
            id="volunteerAreas"
            name="volunteerAreas"
            value={formData.volunteerAreas}
            onChange={handleChange}
            placeholder={t('partnership.volunteerAreasPlaceholder')}
            className="form-input w-full"
          />
        </div>

        <div>
          <label htmlFor="financialCommitment" className="form-label">
            {t('partnership.financialCommitment')}
          </label>
          <textarea
            id="financialCommitment"
            name="financialCommitment"
            value={formData.financialCommitment}
            onChange={handleChange}
            placeholder={t('partnership.financialPlaceholder')}
            rows={3}
            className="form-textarea w-full resize-none"
          />
        </div>

        <div>
          <label htmlFor="materialItems" className="form-label">
            {t('partnership.materialItems')}
          </label>
          <input
            type="text"
            id="materialItems"
            name="materialItems"
            value={formData.materialItems}
            onChange={handleChange}
            placeholder={t('partnership.materialItemsPlaceholder')}
            className="form-input w-full"
          />
        </div>

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
                <span>{t('partnership.submitButton')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.form>
  );
};

export default PartnershipForm;
