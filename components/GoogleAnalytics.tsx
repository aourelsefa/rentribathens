'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { GA_MEASUREMENT_ID, getCookiePreferences } from '@/lib/analytics';

function applyConsentFromPreferences() {
  const prefs = getCookiePreferences();
  if (!prefs?.analytics) return false;

  window.gtag?.('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: prefs.marketing ? 'granted' : 'denied',
    ad_user_data: prefs.marketing ? 'granted' : 'denied',
    ad_personalization: prefs.marketing ? 'granted' : 'denied',
  });

  window.gtag?.('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
  });

  return true;
}

export default function GoogleAnalytics() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setAnalyticsEnabled(applyConsentFromPreferences());
    sync();
    window.addEventListener('cookie-preferences-updated', sync);
    return () => window.removeEventListener('cookie-preferences-updated', sync);
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy='afterInteractive'
      />
      <Script id='google-analytics-consent' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      {analyticsEnabled && (
        <Script id='google-analytics-config' strategy='afterInteractive'>
          {`gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      )}
    </>
  );
}
