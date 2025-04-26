// This function will be called from _app.js to inject the GTM script
export function injectGTMScript(gtmScript) {
  if (typeof window !== 'undefined' && gtmScript) {
    try {
      // Create a temporary container to parse the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = gtmScript;
      
      // Find the script element
      const scriptElement = tempDiv.querySelector('script');
      
      if (scriptElement) {
        // Create a new script element
        const newScript = document.createElement('script');
        
        // Set the script content (without the script tags)
        newScript.textContent = scriptElement.textContent;
        
        // Append to document head
        document.head.appendChild(newScript);
        
        // Create a hidden div to store the GTM script with comments
        const displayDiv = document.createElement('div');
        displayDiv.id = 'gtm-head-container';
        displayDiv.style.display = 'none'; // Hide the div
        
        // Create a text node for the first comment if it exists
        const firstCommentMatch = gtmScript.match(/<!--[\s\S]*?-->/);
        if (firstCommentMatch) {
          const firstComment = document.createComment(firstCommentMatch[0].replace(/<!--|-->/g, ''));
          displayDiv.appendChild(firstComment);
        }
        
        // Create a script element for display
        const displayScript = document.createElement('script');
        displayScript.textContent = scriptElement.textContent;
        displayDiv.appendChild(displayScript);
        
        // Create a text node for the second comment if it exists
        const secondCommentMatch = gtmScript.match(/<!--[\s\S]*?-->/g);
        if (secondCommentMatch && secondCommentMatch.length > 1) {
          const secondComment = document.createComment(secondCommentMatch[1].replace(/<!--|-->/g, ''));
          displayDiv.appendChild(secondComment);
        }
        
        // Append to document body
        document.body.appendChild(displayDiv);
        
        console.log('GTM script injected successfully');
      } else {
        // If no script element is found, try to extract the script content using regex
        const scriptContent = gtmScript.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '$1');
        
        if (scriptContent) {
          // Create a new script element
          const newScript = document.createElement('script');
          
          // Set the script content
          newScript.textContent = scriptContent;
          
          // Append to document head
          document.head.appendChild(newScript);
          
          // Create a div to display the GTM script with comments but without script tags
          const displayDiv = document.createElement('div');
          displayDiv.style.display = 'none'; // Hide the div
          
          // Extract the comments
          const comments = gtmScript.match(/<!--[\s\S]*?-->/g) || [];
          
          // Create the display content
          let displayContent = '';
          
          // Add the first comment if it exists
          if (comments.length > 0) {
            displayContent += comments[0] + '\n';
          }
          
          // Add the script content
          displayContent += scriptContent + '\n';
          
          // Add the second comment if it exists
          if (comments.length > 1) {
            displayContent += comments[1];
          }
          
          // Set the display content
          displayDiv.textContent = displayContent;
          
          // Append to document body
          document.body.appendChild(displayDiv);
          
          console.log('GTM script injected using regex');
        } else {
          console.error('No script content found in GTM script');
        }
      }
    } catch (error) {
      console.error('Error injecting GTM script:', error);
    }
  }
}

// This function will be called from _app.js to inject the GTM body script
export function injectGTMBodyScript(gtmBodyScript) {
  if (typeof window !== 'undefined' && gtmBodyScript) {
    try {
      // Create a temporary container to parse the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = gtmBodyScript;
      
      // Find the noscript element
      const noscriptElement = tempDiv.querySelector('noscript');
      
      if (noscriptElement) {
        // Create a hidden div to store the GTM body script with comments
        const displayDiv = document.createElement('div');
        displayDiv.id = 'gtm-body-container';
        displayDiv.style.display = 'none'; // Hide the div
        
        // Create a text node for the first comment if it exists
        const firstCommentMatch = gtmBodyScript.match(/<!--[\s\S]*?-->/);
        if (firstCommentMatch) {
          const firstComment = document.createComment(firstCommentMatch[0].replace(/<!--|-->/g, ''));
          displayDiv.appendChild(firstComment);
        }
        
        // Create a noscript element for display
        const displayNoscript = document.createElement('noscript');
        displayNoscript.innerHTML = noscriptElement.innerHTML;
        displayDiv.appendChild(displayNoscript);
        
        // Create a text node for the second comment if it exists
        const secondCommentMatch = gtmBodyScript.match(/<!--[\s\S]*?-->/g);
        if (secondCommentMatch && secondCommentMatch.length > 1) {
          const secondComment = document.createComment(secondCommentMatch[1].replace(/<!--|-->/g, ''));
          displayDiv.appendChild(secondComment);
        }
        
        // Append to document body
        document.body.appendChild(displayDiv);
        
        console.log('GTM body script injected successfully');
      } else {
        console.error('No noscript element found in GTM body script');
      }
    } catch (error) {
      console.error('Error injecting GTM body script:', error);
    }
  }
}