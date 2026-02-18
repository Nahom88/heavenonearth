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
  ogImageAlt?: string;
  ogSiteName?: string;
  ogLocale?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tag?: string[];
  schema?: Record<string, any>;
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
  ogImageAlt,
  ogSiteName = 'Heaven on Earth',
  ogLocale = 'en_US',
  twitterCard = 'summary_large_image',
  twitterSite = '@heavenonearth',
  twitterCreator,
  twitterTitle,
  twitterDescription,
  twitterImage,
  keywords = ['church', 'ministry', 'faith', 'worship', 'prayer'],
  author = 'Heaven on Earth',
  publishedTime,
  modifiedTime,
  section,
  tag = [],
  schema,
}) => {
  useEffect(() => {
    // Set document title
    document.title = title;
    
    // Set viewport and charset if not already set
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      document.head.prepend(viewport);
    }
    
    let charset = document.querySelector('meta[charset]');
    if (!charset) {
      charset = document.createElement('meta');
      charset.setAttribute('charset', 'UTF-8');
      document.head.prepend(charset);
    }

    // Update or create meta description and keywords
    const updateOrCreateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    updateOrCreateMeta('description', description);
    if (keywords.length > 0) {
      updateOrCreateMeta('keywords', keywords.join(', '));
    }
    updateOrCreateMeta('author', author);
    updateOrCreateMeta('robots', 'index, follow');
    updateOrCreateMeta('revisit-after', '7 days');
    
    // Article specific meta tags
    if (ogType === 'article') {
      if (publishedTime) updateOrCreateMeta('article:published_time', publishedTime);
      if (modifiedTime) updateOrCreateMeta('article:modified_time', modifiedTime);
      if (section) updateOrCreateMeta('article:section', section);
      tag.forEach((t, i) => updateOrCreateMeta(`article:tag:${i + 1}`, t));
    }

    // Update or create canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    const canonicalHref = canonicalUrl || window.location.href.split('?')[0]; // Remove query params for canonical
    linkCanonical.setAttribute('href', canonicalHref);
    
    // Preconnect to external domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com',
    ];
    
    preconnectDomains.forEach(domain => {
      let link = document.querySelector(`link[href="${domain}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'preconnect');
        link.setAttribute('href', domain);
        link.setAttribute('crossorigin', '');
        document.head.appendChild(link);
      }
    });

    // Open Graph (Facebook)
    const updateOrCreateOgMeta = (property: string, content?: string) => {
      if (!content) return;
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateOrCreateOgMeta('og:type', ogType);
    updateOrCreateOgMeta('og:url', ogUrl || canonicalHref);
    updateOrCreateOgMeta('og:title', ogTitle || title);
    updateOrCreateOgMeta('og:description', ogDescription || description);
    updateOrCreateOgMeta('og:image', ogImage);
    updateOrCreateOgMeta('og:image:alt', ogImageAlt || title);
    updateOrCreateOgMeta('og:site_name', ogSiteName);
    updateOrCreateOgMeta('og:locale', ogLocale);
    
    // Additional OG tags for images
    if (ogImage) {
      updateOrCreateOgMeta('og:image:width', '1200');
      updateOrCreateOgMeta('og:image:height', '630');
      updateOrCreateOgMeta('og:image:type', 'image/jpeg');
    }

    // Twitter Card
    const updateOrCreateTwitterMeta = (name: string, content?: string) => {
      if (!content) return;
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateOrCreateTwitterMeta('twitter:card', twitterCard);
    updateOrCreateTwitterMeta('twitter:site', twitterSite);
    updateOrCreateTwitterMeta('twitter:creator', twitterCreator || twitterSite);
    updateOrCreateTwitterMeta('twitter:title', twitterTitle || title);
    updateOrCreateTwitterMeta('twitter:description', twitterDescription || description);
    updateOrCreateTwitterMeta('twitter:image', twitterImage || ogImage);
    updateOrCreateTwitterMeta('twitter:image:alt', ogImageAlt || title);
    
    // Add structured data (JSON-LD)
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    
    const structuredData = schema || {
      '@context': 'https://schema.org',
      '@type': ogType === 'article' ? 'Article' : 'WebPage',
      'headline': title,
      'description': description,
      'url': canonicalHref,
      'publisher': {
        '@type': 'Organization',
        'name': 'Heaven on Earth',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://heavenonearth.et/logo.png'
        }
      },
      ...(ogType === 'article' ? {
        'datePublished': publishedTime,
        'dateModified': modifiedTime || publishedTime,
        'author': {
          '@type': 'Person',
          'name': author
        },
        'keywords': keywords.join(', ')
      } : {})
    };
    
    script.textContent = JSON.stringify(structuredData, null, 2);

    // Clean up on unmount (optional, as new page will overwrite)
    // Cleanup function to remove meta tags when component unmounts
    return () => {
      // We don't remove the tags here as they might be needed by other components
      // The tags will be properly updated on the next render
    };
  }, [
    title, description, canonicalUrl, ogType, ogUrl, ogTitle, ogDescription, 
    ogImage, twitterCard, twitterSite, twitterCreator, twitterTitle, 
    twitterDescription, twitterImage, keywords, author, publishedTime, 
    modifiedTime, section, tag, schema, ogImageAlt, ogSiteName, ogLocale
  ]);

  // Add hreflang for multi-language support
  useEffect(() => {
    const languages = ['en', 'am'];
    const baseUrl = 'https://heavenonearth.et';
    
    languages.forEach(lang => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang);
        document.head.appendChild(link);
      }
      const url = new URL(canonicalUrl || window.location.pathname, baseUrl);
      url.searchParams.set('lang', lang);
      link.setAttribute('href', url.toString());
    });
    
    // Add x-default hreflang
    let defaultLink = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (!defaultLink) {
      defaultLink = document.createElement('link');
      defaultLink.setAttribute('rel', 'alternate');
      defaultLink.setAttribute('hreflang', 'x-default');
      document.head.appendChild(defaultLink);
    }
    const defaultUrl = new URL(canonicalUrl || window.location.pathname, baseUrl);
    defaultLink.setAttribute('href', defaultUrl.toString());
    
    return () => {
      // Cleanup hreflang links on unmount
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    };
  }, [canonicalUrl]);

  return null; // This component doesn't render anything visible
};

export default SeoHead;
