import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Phone,
      label: t('contact.phone'),
      value: '+251 90 554 3858',
      href: 'tel:+251905543858',
    },
    {
      icon: Mail,
      label: t('contact.email'),
      value: 'heavenonearthkingdomfamily@gmail.com',
      href: 'mailto:heavenonearthkingdomfamily@gmail.com',
    },
    {
      icon: MessageCircle,
      label: t('contact.telegram'),
      value: '@kingdomfamilyyy',
      href: 'https://t.me/kingdomfamilyyy',
    },
    {
      icon: MapPin,
      label: t('contact.location'),
      value: 'Bole Road, Addis Ababa, Ethiopia',
      href: '#map',
    },
  ];

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
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl font-bold text-primary mb-8">
              Get In Touch
            </h2>
            
            <div className="space-y-6 mb-10">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-secondary/30 hover:shadow-card transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary transition-colors">
                    <item.icon className="w-6 h-6 text-secondary group-hover:text-secondary-foreground transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                    <p className="font-medium text-foreground group-hover:text-secondary transition-colors break-all">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Office Hours */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-secondary" />
                <h3 className="font-heading text-lg font-bold text-primary">{t('contact.hours')}</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium text-foreground">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium text-foreground">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium text-secondary">Worship Service</span>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-secondary/10 rounded-xl p-6 mt-6 border border-secondary/20">
              <h3 className="font-heading text-lg font-bold text-primary mb-4">{t('giving.bankDetails')}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('giving.bank')}</span>
                  <span className="font-medium text-foreground">Commercial Bank of Ethiopia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('giving.account')}</span>
                  <span className="font-medium text-foreground">1000345678901</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('giving.swift')}</span>
                  <span className="font-medium text-foreground">CBETETAA</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="aspect-[21/9] rounded-xl overflow-hidden shadow-card"
            >
              <iframe
                title="Church Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.78!3d9.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMzYuMCJOIDM4wrA0Nic0OC4wIkU!5e0!3m2!1sen!2set!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
