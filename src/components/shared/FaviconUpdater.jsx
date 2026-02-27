'use client';

import { useEffect } from 'react';
import { getSettings } from '@/lib/api';

/**
 * FaviconUpdater Component
 * Updates the favicon dynamically based on settings from API
 */
export default function FaviconUpdater() {
  useEffect(() => {
    const updateFavicon = async () => {
      try {
        const settings = await getSettings();
        const faviconUrl = settings?.favicon;

        if (faviconUrl) {
          // Remove existing favicon links
          const existingLinks = document.querySelectorAll("link[rel*='icon']");
          existingLinks.forEach(link => link.remove());

          // Add new favicon
          const link = document.createElement('link');
          link.rel = 'icon';
          link.type = 'image/png';
          link.href = faviconUrl;
          document.head.appendChild(link);

          // Add apple-touch-icon
          const appleLink = document.createElement('link');
          appleLink.rel = 'apple-touch-icon';
          appleLink.href = faviconUrl;
          document.head.appendChild(appleLink);
        }
      } catch (error) {
        console.error('Error updating favicon:', error);
      }
    };

    updateFavicon();
  }, []);

  return null;
}
