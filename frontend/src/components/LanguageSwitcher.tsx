import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'am' : 'en';
    i18n.changeLanguage(newLang);
    
    // Update document direction for RTL support (Amharic uses LTR but keeping for extensibility)
    document.documentElement.dir = 'ltr';
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-sm font-nav font-medium text-foreground/80 hover:text-secondary bg-muted hover:bg-secondary/10 rounded-lg transition-all duration-200"
      aria-label="Switch language"
    >
      <Globe size={18} />
      <span className="hidden sm:inline">
        {i18n.language === 'en' ? 'አማ' : 'EN'}
      </span>
      <span className="sm:hidden">
        {i18n.language === 'en' ? 'አማ' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
