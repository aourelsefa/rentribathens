'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const GA_MEASUREMENT_ID = 'G-CXM9YP9X89';
const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

function hasAnalyticsConsent(): boolean {
  const saved = localStorage.getItem(COOKIE_PREFERENCES_KEY);
  if (!saved) return false;
  try {
    const prefs = JSON.parse(saved) as { analytics?: boolean };
    return !!prefs.analytics;
  } catch {
    return false;
  }
}

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(hasAnalyticsConsent());
    sync();
    window.addEventListener('cookie-preferences-updated', sync);
    return () => window.removeEventListener('cookie-preferences-updated', sync);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
