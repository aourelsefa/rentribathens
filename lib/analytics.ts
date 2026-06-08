export const GA_MEASUREMENT_ID = 'G-CXM9YP9X89';

const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(COOKIE_PREFERENCES_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as CookiePreferences;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return !!getCookiePreferences()?.analytics;
}

export function trackPhoneClick(params: {
  buttonLocation: string;
  buttonText?: string;
  boatName?: string;
}) {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;

  window.gtag?.('event', 'phone_click', {
    button_location: params.buttonLocation,
    button_text: params.buttonText || '',
    boat_name: params.boatName || '',
    page_path: window.location.pathname,
    page_title: document.title,
  });
}
