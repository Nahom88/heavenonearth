import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import logo from '@/assets/logo.png';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const quickLinks = [
    { path: '/about', label: t('nav.about') },
    { path: '/ministries', label: t('nav.ministries') },
    { path: '/events', label: t('nav.events') },
    { path: '/prayer', label: t('nav.prayer') },
    { path: '/giving', label: t('nav.giving') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const helpItems = [
    t('help.pray'),
    t('help.give'),
    t('help.volunteer'),
    t('help.share'),
    t('help.connect'),
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading text-2xl font-bold mb-2">{t('newsletter.title')}</h3>
            <p className="text-primary-foreground/80 mb-4">{t('newsletter.subtitle')}</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="btn-gold flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Send size={18} />
                {t('newsletter.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Logo" className="h-12 w-12 rounded-full" />
              <div>
                <h4 className="font-heading font-bold text-secondary">{t('header.title')}</h4>
                <p className="text-xs text-primary-foreground/70">{t('header.subtitle')}</p>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              {t('footer.about')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4 text-secondary">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* How You Can Help */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4 text-secondary">
              {t('help.title')}
            </h4>
            <ul className="space-y-2">
              {helpItems.map((item, index) => (
                <li key={index} className="text-primary-foreground/80 text-sm flex items-start gap-2">
                  <span className="text-secondary mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4 text-secondary">
              {t('footer.connect')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <Phone size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                <a href={`tel:${t('contactInfo.phone')}`} className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  {t('contactInfo.phone')}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                <a href={`mailto:${t('contactInfo.email')}`} className="text-primary-foreground/80 hover:text-secondary transition-colors break-all">
                  {t('contactInfo.email')}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  {t('contactInfo.address')}
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  {t('contactInfo.monFriHours')}<br />{t('contactInfo.satHours')}
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://t.me/kingdomfamilyyy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-all duration-200"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.833.94z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/heavenonearthministries"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/c/HeavenOnEarthMinistries"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-all duration-200"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-primary-foreground/60">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
