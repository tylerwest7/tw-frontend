import { useEffect } from "react";

const GoogleTagManager = () => {
  useEffect(() => {
    const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;

    if (googleAnalyticsId) {
      // Add the Google tag (gtag.js) asynchronously
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script);

      // Define the dataLayer if it doesn't exist
      (window as any).dataLayer = (window as any).dataLayer || [];

      // Define the gtag function
      const gtag = (...args: any[]) => {
        (window as any).dataLayer.push(...args);
      };

      // Initialize gtag with 'js' command and current date
      gtag("js", new Date());

      // Configure gtag with 'config' command and the provided ID
      gtag("config", googleAnalyticsId);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default GoogleTagManager;
