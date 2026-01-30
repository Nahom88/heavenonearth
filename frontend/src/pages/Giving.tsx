import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, CreditCard, Building2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const Giving = () => {
  const { t } = useTranslation();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const bankDetails = [
    { label: t('giving.bankTransfer.bank'), value: t('giving.bankTransfer.bankName'), copyable: false },
    { label: t('giving.bankTransfer.account'), value: t('giving.bankTransfer.accountNumber'), copyable: true },
    { label: t('giving.bankTransfer.swift'), value: t('giving.bankTransfer.swiftCode'), copyable: true },
  ];

  const givingOptions = t('giving.options', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    verse: string;
  }>;

  const impactStats = t('giving.impact.stats', { returnObjects: true }) as Array<{
    number: string;
    label: string;
  }>;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Heart className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {t('giving.title')}
            </h1>
            <div className="scripture-quote text-primary-foreground/90 border-secondary max-w-xl mx-auto">
              <p>"{t('giving.subtitle')}"</p>
              <p className="text-secondary font-semibold mt-2">— {t('giving.scripture')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why We Give */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="section-title mb-6">{t('giving.whyGiveTitle')}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t('giving.description')}
          </p>
        </motion.div>

        {/* Giving Options */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {givingOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-card border border-border hover:border-secondary/30 transition-all duration-300"
            >
              <h3 className="font-heading text-xl font-bold text-primary mb-3">
                {option.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {option.description}
              </p>
              <p className="text-xs italic text-secondary">
                {option.verse}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bank Details */}
      <section className="bg-muted py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <Building2 className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h2 className="section-title">{t('giving.bankDetails')}</h2>
              <p className="section-subtitle">
                {t('giving.bankTransfer.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl shadow-card border border-border overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary to-primary/90 p-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-8 h-8 text-secondary" />
                  <div>
                    <p className="text-primary-foreground font-heading font-bold text-lg">
                      {t('giving.bankTransfer.title')}
                    </p>
                    <p className="text-primary-foreground/70 text-sm">
                      {t('giving.bankTransfer.secure')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {bankDetails.map((detail, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{detail.label}</p>
                        <p className="font-medium text-foreground">{detail.value}</p>
                      </div>
                      {detail.copyable && (
                        <button
                          onClick={() => copyToClipboard(detail.value, detail.label)}
                          className="p-2 bg-secondary/10 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors"
                          title="Copy to clipboard"
                        >
                          {copiedField === detail.label ? (
                            <Check className="w-5 h-5 text-secondary" />
                          ) : (
                            <Copy className="w-5 h-5 text-secondary" />
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">{t('giving.bankTransfer.reference')}:</strong> {t('giving.bankTransfer.referenceNote')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <p className="text-muted-foreground">
                {t('giving.bankTransfer.questions')}{' '}
                <a href="mailto:heavenonearthkingdomfamily@gmail.com" className="text-secondary hover:underline">
                  heavenonearthkingdomfamily@gmail.com
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-8 md:p-12 border border-secondary/20"
        >
          <h2 className="font-heading text-3xl font-bold text-primary mb-6">
            {t('giving.impact.title')}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-heading text-4xl font-bold text-secondary mb-2">
                  {stat.number}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {t('giving.impact.thankYou')}
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Giving;
