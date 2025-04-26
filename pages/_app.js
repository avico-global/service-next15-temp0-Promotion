import "@/styles/globals.css";
import { Barlow } from "next/font/google";
import { useEffect } from "react";
import { injectGTMScript, injectGTMBodyScript } from "@/lib/gtm";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
}); 

export default function App({ Component, pageProps }) {
  // Inject GTM script if available
  useEffect(() => {
    if (pageProps.gtm_head) {
      injectGTMScript(pageProps.gtm_head);
    }
    
    if (pageProps.gtm_body) {
      injectGTMBodyScript(pageProps.gtm_body);
    }
  }, [pageProps.gtm_head, pageProps.gtm_body]);

  return (
    <div className={barlow.className}>
      <Component {...pageProps} />
    </div>
  );
}
