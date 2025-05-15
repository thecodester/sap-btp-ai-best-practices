/**
 * Client-side script to load external scripts with delay
 */

// Check if we're in browser environment
const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

/**
 * Loads a script dynamically
 */
function loadScript(src: string, async: boolean = false): Promise<void> {
  if (!isBrowser) return Promise.resolve();

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
  if (!isBrowser) return;

  // Delay script loading by specified milliseconds
  const DELAY_MS = 1000; // Adjust delay time as needed

  setTimeout(() => {
    // Load only the SAP shared library script
    loadScript("https://www.sap.com/sharedlibs/globaltop/script-1.0.50.min.js").catch((error) => console.error("Failed to load scripts:", error));
  }, DELAY_MS);
}
