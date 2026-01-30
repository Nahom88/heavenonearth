import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HandHeart, DollarSign, Users, Package, Check } from 'lucide-react';
import PartnershipForm from '@/components/PartnershipForm';

const Partnership = () => {
  const { t } = useTranslation();

  const partnershipTypesData = t('partnership.types', { returnObjects: true }) as {
    financial: { title: string; description: string; benefits: string[] };
    volunteer: { title: string; description: string; benefits: string[] };
    material: { title: string; description: string; benefits: string[] };
  };

  const partnershipTypes = [
    {
      icon: DollarSign,
      ...partnershipTypesData.financial,
    },
    {
      icon: Users,
      ...partnershipTypesData.volunteer,
    },
    {
      icon: Package,
      ...partnershipTypesData.material,
    },
  ];

  const whyPartnerReasons = t('partnership.reasons', { returnObjects: true }) as string[];

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
            <HandHeart className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {t('partnership.title')}
            </h1>
            <p className="text-primary-foreground/80 text-lg">{t('partnership.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Description */}
      <section className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('partnership.description')}
          </p>
        </motion.div>

        {/* Partnership Types */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {partnershipTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl shadow-card border border-border overflow-hidden group hover:border-secondary/30 transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-primary to-primary/90 p-6">
                <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center mb-4">
                  <type.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-primary-foreground">
                  {type.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground text-sm mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partnership Form Section */}
      <section className="bg-muted py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title mb-6">{t('partnership.readyToPartner')}</h2>
              <p className="text-muted-foreground text-lg mb-8">{t('partnership.formIntro')}</p>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-heading text-lg font-bold text-primary mb-4">
                  {t('partnership.whyPartner')}
                </h3>
                <ul className="space-y-4">
                  {whyPartnerReasons.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="text-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <PartnershipForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partnership;
