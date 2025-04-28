import "@ui5/webcomponents-icons/dist/decrease-line-height.js";
import "@ui5/webcomponents-icons/dist/lateness.js";
import "@ui5/webcomponents-icons/dist/connected.js";
import "@ui5/webcomponents-icons/dist/documents.js";
import "@ui5/webcomponents-icons/dist/hide.js";
import "@ui5/webcomponents-icons/dist/filter.js";
import "@ui5/webcomponents-icons/dist/compare.js";
import "@ui5/webcomponents-icons/dist/discussion.js";

const capabilityIcons: Record<string, string> = {
  // === Functional View ===
  "/docs/functional-view/information-analysis-and-processing/summarization-of-text": "decrease-line-height",
  // Add other functional view mappings... Ensure NO trailing slashes in keys

  // === Technical View - Generative AI ===
  // Plain
  "/docs/technical-view/generative-ai/plain": "discussion",
  "/docs/technical-view/generative-ai/plain/access-to-generative-ai-models": "connected",
  "/docs/technical-view/generative-ai/plain/prompt-templating": "documents",
  "/docs/technical-view/generative-ai/plain/data-masking": "hide",
  "/docs/technical-view/generative-ai/plain/content-filtering": "filter",

  // RAG
  "/docs/technical-view/generative-ai/rag/vector-vs-graph": "compare",
  "/docs/technical-view/generative-ai/rag/vector-overall": "lateness",
  "/docs/technical-view/generative-ai/rag/vector-query": "lateness",
  "/docs/technical-view/generative-ai/rag/graph-overall": "lateness",
  "/docs/technical-view/generative-ai/rag/graph-query": "lateness",

  // Agentic
  "/docs/technical-view/generative-ai/agentic/single-agent": "lateness",
  "/docs/technical-view/generative-ai/agentic/multi-agent": "lateness"

  // Default/Placeholder for others
  // Add specific mappings here as new capabilities get icons
};

/**
 * Gets the UI5 icon name associated with a given capability or technical pattern href.
 * Falls back to 'lateness' if no specific icon is mapped.
 * Handles trailing slashes in the input href automatically and attempts lookup
 * both with and without a trailing slash against the map keys.
 * @param href The href string of the link.
 * @returns The name of the UI5 icon.
 */
export const getIconForCapability = (href: string | undefined): string => {
  // Return default if href is undefined or null
  if (!href) {
    return "lateness";
  }

  // Normalize input href by removing trailing slash if present (and not the root '/')
  const normalizedHref = href.length > 1 && href.endsWith("/") ? href.slice(0, -1) : href;

  // 1. Try lookup with the key exactly as normalized (no trailing slash)
  let icon = capabilityIcons[normalizedHref];

  // 2. If not found, try lookup with a trailing slash added to the normalized key
  if (!icon) {
    icon = capabilityIcons[normalizedHref + "/"];
  }

  // Return the found icon or the default 'lateness' icon
  return icon || "lateness";
};
