/**
 * Client-side script to load external scripts with delay
 */

// Get the base URL from Docusaurus
const baseUrl = document.querySelector('meta[name="docusaurus-base-url"]')?.getAttribute("content") || "/";

/**
 * Loads a script dynamically
 */
function loadScript(src: string, async: boolean = false): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = async;
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.body.appendChild(script);
  });
}

/**
 * Add scripts with delay
 */
export function onRouteDidUpdate(): void {
  // Delay script loading by specified milliseconds
  const DELAY_MS = 1000; // Adjust delay time as needed

  setTimeout(() => {
    // Load only the SAP shared library script
    loadScript("https://www.sap.com/sharedlibs/globaltop/script-1.0.50.min.js").catch((error) => console.error("Failed to load scripts:", error));
  }, DELAY_MS);
}
