import "@/styles/globals.css";
import { Barlow } from "next/font/google";
import { useEffect, useState } from "react";
import { injectGTMScript, injectGTMBodyScript } from "@/lib/gtm";
import { Toaster } from "react-hot-toast";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  const [gtmLoaded, setGtmLoaded] = useState(false);

  // Securely fetch and inject GTM script if not already loaded
  useEffect(() => {
    async function loadGTM() {
      if (gtmLoaded) return;
      
      try {
        // Fetch GTM configuration from our secure API endpoint
        const response = await fetch('/api/site-config?configType=gtm');
        if (!response.ok) {
          console.error('Failed to fetch GTM config:', response.status);
          return;
        }
        
        const { gtm_head, gtm_body } = await response.json();
        let scriptsLoaded = false;
        
        // Inject GTM scripts if available
        if (gtm_head) {
          scriptsLoaded = injectGTMScript(gtm_head);
        }
        
        if (gtm_body) {
          const bodyScriptLoaded = injectGTMBodyScript(gtm_body);
          scriptsLoaded = scriptsLoaded || bodyScriptLoaded;
        }
        
        if (scriptsLoaded) {
          setGtmLoaded(true);
        }
      } catch (error) {
        console.error('Error loading GTM:', error);
      }
    }
    
    loadGTM();
  }, [gtmLoaded]);

  return (
    <div className={barlow.className}>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#22c55e',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
    </div>
  );
}
