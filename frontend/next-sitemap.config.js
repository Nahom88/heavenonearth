/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://heavenonearth.et',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
    ],
    additionalSitemaps: [
      'https://heavenonearth.et/sitemap.xml',
    ],
  },
  exclude: ['/server-sitemap.xml', '/admin/*', '/api/*'],
  generateIndexSitemap: true,
  outDir: 'public',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  autoLastmod: true,
  sourceDir: '.next',
  // Add additional paths that are not automatically discovered
  additionalPaths: async (config) => [
    await config.transform(config, '/about'),
    await config.transform(config, '/ministries'),
    await config.transform(config, '/events'),
    await config.transform(config, '/prayer'),
    await config.transform(config, '/partnership'),
    await config.transform(config, '/giving'),
    await config.transform(config, '/gallery'),
    await config.transform(config, '/contact'),
  ],
}
