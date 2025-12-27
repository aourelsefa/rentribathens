'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale, getTranslations } from '@/lib/i18n';

interface CookieConsentProps {
  locale: Locale;
}

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

export default function CookieConsent({ locale }: CookieConsentProps) {
  const t = getTranslations(locale);
  const cookieBanner = t('gdpr.cookieBanner') as any;

  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    } else {
      // Load saved preferences
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(onlyNecessary);
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className='fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 md:p-6 shadow-2xl z-50 border-t border-gray-700'>
        <div className='container-custom max-w-6xl mx-auto'>
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
            <div className='flex-1'>
              <h3 className='text-lg font-semibold mb-2'>
                {cookieBanner.title}
              </h3>
              <p className='text-gray-300 text-sm md:text-base mb-2'>
                {cookieBanner.description}
              </p>
              <div className='flex flex-wrap gap-2 text-sm'>
                <Link
                  href={
                    locale === 'el' ? '/privacy-policy' : '/en/privacy-policy'
                  }
                  className='text-primary hover:text-primary/80 underline'
                >
                  {t('gdpr.privacyPolicy')}
                </Link>
                <span className='text-gray-500'>•</span>
                <Link
                  href={
                    locale === 'el' ? '/cookie-policy' : '/en/cookie-policy'
                  }
                  className='text-primary hover:text-primary/80 underline'
                >
                  {cookieBanner.title}
                </Link>
              </div>
            </div>
            <div className='flex flex-wrap gap-3'>
              <button
                onClick={() => setShowPreferences(true)}
                className='px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors text-sm'
              >
                {cookieBanner.customize}
              </button>
              <button
                onClick={handleRejectAll}
                className='px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors text-sm'
              >
                {cookieBanner.rejectAll}
              </button>
              <button
                onClick={handleAcceptAll}
                className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-semibold'
              >
                {cookieBanner.acceptAll}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className='fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4'>
          <div className='bg-gray-900 text-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6'>
            <h2 className='text-2xl font-bold mb-4'>
              {cookieBanner.customize}
            </h2>
            <p className='text-gray-300 mb-6'>{cookieBanner.description}</p>

            <div className='space-y-4 mb-6'>
              {/* Necessary Cookies */}
              <div className='border border-gray-700 rounded-lg p-4'>
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex-1'>
                    <h3 className='font-semibold mb-1'>
                      {cookieBanner.necessary}
                    </h3>
                    <p className='text-sm text-gray-300'>
                      {cookieBanner.necessaryDesc}
                    </p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer ml-4'>
                    <input
                      type='checkbox'
                      checked={preferences.necessary}
                      disabled
                      className='sr-only peer'
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className='border border-gray-700 rounded-lg p-4'>
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex-1'>
                    <h3 className='font-semibold mb-1'>
                      {cookieBanner.analytics}
                    </h3>
                    <p className='text-sm text-gray-300'>
                      {cookieBanner.analyticsDesc}
                    </p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer ml-4'>
                    <input
                      type='checkbox'
                      checked={preferences.analytics}
                      onChange={() => handleTogglePreference('analytics')}
                      className='sr-only peer'
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className='border border-gray-700 rounded-lg p-4'>
                <div className='flex items-start justify-between mb-2'>
                  <div className='flex-1'>
                    <h3 className='font-semibold mb-1'>
                      {cookieBanner.marketing}
                    </h3>
                    <p className='text-sm text-gray-300'>
                      {cookieBanner.marketingDesc}
                    </p>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer ml-4'>
                    <input
                      type='checkbox'
                      checked={preferences.marketing}
                      onChange={() => handleTogglePreference('marketing')}
                      className='sr-only peer'
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className='flex gap-3 justify-end'>
              <button
                onClick={() => setShowPreferences(false)}
                className='px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors'
              >
                {locale === 'el' ? 'Ακύρωση' : 'Cancel'}
              </button>
              <button
                onClick={handleSaveCustom}
                className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold'
              >
                {cookieBanner.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
