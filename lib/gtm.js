/**
 * Injects Google Tag Manager script into document head
 * @param {string} gtmScript - Full GTM script snippet from dashboard
 */
export function injectGTMScript(gtmScript) {
  if (typeof window === 'undefined' || !gtmScript) return;
  
  try {
    // Extract script content from full HTML snippet
    const scriptContent = gtmScript.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '$1');
    
    if (!scriptContent.trim()) {
      console.error('No valid script content found in GTM script');
      return;
    }
    
    // Create and inject script element
    const script = document.createElement('script');
    script.textContent = scriptContent;
    document.head.appendChild(script);
  } catch (error) {
    console.error('Error injecting GTM script:', error);
  }
}

/**
 * Injects Google Tag Manager noscript element into document body
 * @param {string} gtmBodyScript - Full GTM noscript snippet from dashboard
 */
export function injectGTMBodyScript(gtmBodyScript) {
  if (typeof window === 'undefined' || !gtmBodyScript) return;
  
  try {
    // Create temporary container to parse HTML
    const container = document.createElement('div');
    container.innerHTML = gtmBodyScript;
    
    // Find and extract noscript content
    const noscriptElement = container.querySelector('noscript');
    
    if (!noscriptElement) {
      console.error('No noscript element found in GTM body script');
      return;
    }
    
    // Create new noscript element to avoid potential DOM issues
    const noscript = document.createElement('noscript');
    noscript.innerHTML = noscriptElement.innerHTML;
    
    // Add to body
    document.body.appendChild(noscript);
  } catch (error) {
    console.error('Error injecting GTM body script:', error);
  }
}
