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
    if (path === '/') {
      customConfig.priority = 1.0;
      customConfig.changefreq = 'daily';
    } else if (path.startsWith('/boats/')) {
      customConfig.priority = 0.9;
      customConfig.changefreq = 'weekly';
    } else if (path === '/boats') {
      customConfig.priority = 0.9;
      customConfig.changefreq = 'weekly';
    } else if (path === '/services') {
      customConfig.priority = 0.8;
      customConfig.changefreq = 'monthly';
    } else if (path === '/contact') {
      customConfig.priority = 0.8;
      customConfig.changefreq = 'monthly';
    }

    return customConfig;
  },

  // Additional paths to include
  additionalPaths: async (config) => {
    const { boats } = await import('./data/boats.ts');
    
    // Generate paths for individual boat pages
    const boatPaths = boats.map(boat => ({
      loc: `/boats/${boat.slug}`,
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    }));

    return [
      ...boatPaths,
      // Add any other dynamic paths here
    ];
  },

  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
    ],
    additionalSitemaps: [
      // Add any additional sitemaps here if needed
    ],
  },

  // Exclude certain paths from sitemap
  exclude: [
    '/api/*',
    '/_next/*',
    '/admin/*',
    '/private/*',
  ],

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
