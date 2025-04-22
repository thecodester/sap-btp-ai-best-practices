// src/data/capabilityIcons.ts

const capabilityIcons: Record<string, string> = {
  // === Functional View ===
  "/docs/functional-view/information-analysis-and-processing/summarization-of-text": "decrease-line-height",
  // Add other functional view mappings...

  // === Technical View - Generative AI ===
  // Plain
  "/docs/technical-view/generative-ai/plain/": "discussion", // Link from Summarization page
  "/docs/technical-view/generative-ai/plain/access-to-generative-ai-models": "connected",
  "/docs/technical-view/generative-ai/plain/prompt-templating": "documents", // Disabled
  "/docs/technical-view/generative-ai/plain/data-masking": "hide", // Disabled
  "/docs/technical-view/generative-ai/plain/content-filtering": "filter", // Disabled

  // RAG
  "/docs/technical-view/generative-ai/rag/vector-vs-graph": "compare", // Placeholder href, Disabled
  "/docs/technical-view/generative-ai/rag/vector-overall": "lateness", // Placeholder href, Disabled
  "/docs/technical-view/generative-ai/rag/vector-query": "lateness", // Placeholder href, Disabled
  "/docs/technical-view/generative-ai/rag/graph-overall": "lateness", // Placeholder href, Disabled
  "/docs/technical-view/generative-ai/rag/graph-query": "lateness", // Placeholder href, Disabled

  // Agentic
  "/docs/technical-view/generative-ai/agentic/single-agent": "lateness", // Placeholder href, Disabled
  "/docs/technical-view/generative-ai/agentic/multi-agent": "lateness" // Placeholder href, Disabled

  // Default/Placeholder for others - assuming lateness for now
  // Add specific mappings here as new capabilities get icons
};

/**
 * Gets the UI5 icon name associated with a given capability or technical pattern href.
 * Falls back to 'lateness' if no specific icon is mapped.
 * @param href The href string of the link.
 * @returns The name of the UI5 icon.
 */
export const getIconForCapability = (href: string | undefined): string => {
  // Return default if href is undefined or null
  if (!href) {
    return "lateness";
  }
  return capabilityIcons[href] || "lateness"; // Default to 'lateness' if no specific icon is mapped
};
