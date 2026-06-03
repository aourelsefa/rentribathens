/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr',
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false, // Disable index sitemap for simplicity

  // Default transformation function
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    const customConfig = {
      loc: path, // the absolute URL
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };

    // Set higher priority for important pages
    if (path === '/' || path === '/en') {
      customConfig.priority = 1.0;
      customConfig.changefreq = 'daily';
    } else if (path.startsWith('/boats/') || path.startsWith('/en/boats/')) {
      customConfig.priority = 0.9;
      customConfig.changefreq = 'weekly';
    } else if (path === '/fleet' || path === '/en/fleet') {
      customConfig.priority = 0.9;
      customConfig.changefreq = 'weekly';
    } else if (
      path.startsWith('/destinations/') ||
      path.startsWith('/en/destinations/')
    ) {
      customConfig.priority = 0.8;
      customConfig.changefreq = 'monthly';
    } else if (path === '/services' || path === '/en/services') {
      customConfig.priority = 0.8;
      customConfig.changefreq = 'monthly';
    } else if (path === '/contact' || path === '/en/contact') {
      customConfig.priority = 0.8;
      customConfig.changefreq = 'monthly';
    }

    return customConfig;
  },

  // Additional paths to include
  additionalPaths: async _config => {
    const { boats } = await import('./data/boats.ts');
    const { destinations } = await import('./data/destinations.ts');

    const paths = [];

    // Generate paths for individual boat pages (both locales)
    boats.forEach(boat => {
      // Greek version (root level)
      paths.push({
        loc: `/boats/${boat.slug}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      });
      // English version
      paths.push({
        loc: `/en/boats/${boat.slug}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      });
    });

    // Generate paths for destination pages (both locales)
    destinations.forEach(destination => {
      // Greek version (root level)
      paths.push({
        loc: `/destinations/${destination.slug}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
      // English version
      paths.push({
        loc: `/en/destinations/${destination.slug}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });

    // Add static pages for both locales
    const staticPages = [
      { path: '/', priority: 1.0, changefreq: 'daily' },
      { path: '/en', priority: 1.0, changefreq: 'daily' },
      { path: '/fleet', priority: 0.9, changefreq: 'weekly' },
      { path: '/en/fleet', priority: 0.9, changefreq: 'weekly' },
      { path: '/services', priority: 0.8, changefreq: 'monthly' },
      { path: '/en/services', priority: 0.8, changefreq: 'monthly' },
      { path: '/contact', priority: 0.8, changefreq: 'monthly' },
      { path: '/en/contact', priority: 0.8, changefreq: 'monthly' },
      { path: '/privacy-policy', priority: 0.5, changefreq: 'yearly' },
      { path: '/en/privacy-policy', priority: 0.5, changefreq: 'yearly' },
      { path: '/terms-of-service', priority: 0.5, changefreq: 'yearly' },
      { path: '/en/terms-of-service', priority: 0.5, changefreq: 'yearly' },
      { path: '/cookie-policy', priority: 0.5, changefreq: 'yearly' },
      { path: '/en/cookie-policy', priority: 0.5, changefreq: 'yearly' },
    ];

    staticPages.forEach(page => {
      paths.push({
        loc: page.path,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: new Date().toISOString(),
      });
    });

    return paths;
  },

  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
    ],
    additionalSitemaps: [
      // Add any additional sitemaps here if needed
    ],
  },

  // Exclude certain paths from sitemap
  exclude: ['/api/*', '/_next/*', '/admin/*', '/private/*'],

  // Custom sitemap configuration
  sitemapSize: 5000,

  // Add alternate language versions if needed
  alternateRefs: [
    {
      href: process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr',
      hreflang: 'el',
    },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://rentribathens.gr'}/en`,
      hreflang: 'en',
    },
  ],
};
