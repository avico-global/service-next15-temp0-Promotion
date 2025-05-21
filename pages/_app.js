import "@/styles/globals.css";
import { Barlow } from "next/font/google";
import { useEffect, useState } from "react";
import { injectGTMScript, injectGTMBodyScript } from "@/lib/gtm";

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
        if (!response.ok) return;
        
        const { gtm_head, gtm_body } = await response.json();
        
        // Inject GTM scripts if available
        if (gtm_head) {
          injectGTMScript(gtm_head);
        }
        
        if (gtm_body) {
          injectGTMBodyScript(gtm_body);
        }
        
        setGtmLoaded(true);
      } catch (error) {
        console.error('Error loading GTM:', error);
      }
    }
    
    loadGTM();
  }, [gtmLoaded]);

  return (
    <div className={barlow.className}>
      <Component {...pageProps} />
    </div>
  );
}
