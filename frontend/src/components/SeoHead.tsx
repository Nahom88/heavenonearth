import React, { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: string;
  ogUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogUrl,
  ogTitle,
  ogDescription,
  ogImage,
  twitterCard = 'summary_large_image',
  twitterSite,
  twitterCreator,
  twitterTitle,
  twitterDescription,
  twitterImage,
}) => {
  useEffect(() => {
    document.title = title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update or create canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    if (canonicalUrl) {
      linkCanonical.setAttribute('href', canonicalUrl);
    } else {
      linkCanonical.setAttribute('href', window.location.href); // Default to current URL
    }

    // Open Graph (Facebook)
    const updateOrCreateOgMeta = (property: string, content?: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      if (content) {
        meta.setAttribute('content', content);
      } else {
        meta.removeAttribute('content');
      }
    };

    updateOrCreateOgMeta('og:type', ogType);
    updateOrCreateOgMeta('og:url', ogUrl || canonicalUrl || window.location.href);
    updateOrCreateOgMeta('og:title', ogTitle || title);
    updateOrCreateOgMeta('og:description', ogDescription || description);
    updateOrCreateOgMeta('og:image', ogImage);

    // Twitter Card
    const updateOrCreateTwitterMeta = (name: string, content?: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      if (content) {
        meta.setAttribute('content', content);
      } else {
        meta.removeAttribute('content');
      }
    };

    updateOrCreateTwitterMeta('twitter:card', twitterCard);
    updateOrCreateTwitterMeta('twitter:site', twitterSite);
    updateOrCreateTwitterMeta('twitter:creator', twitterCreator);
    updateOrCreateTwitterMeta('twitter:title', twitterTitle || title);
    updateOrCreateTwitterMeta('twitter:description', twitterDescription || description);
    updateOrCreateTwitterMeta('twitter:image', twitterImage);

    // Clean up on unmount (optional, as new page will overwrite)
    return () => {
      // You might want to reset to default values or remove dynamically added tags
      // For simplicity, we'll let the next page's SeoHead overwrite
    };
  }, [
    title,
    description,
    canonicalUrl,
    ogType,
    ogUrl,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    twitterSite,
    twitterCreator,
    twitterTitle,
    twitterDescription,
    twitterImage,
  ]);

  return null; // This component doesn't render anything visible
};

export default SeoHead;
