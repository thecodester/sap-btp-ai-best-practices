export const getBasePath = () => {
  // In development, basePath is undefined
  // In production, it's set in next.config.js
  return process.env.NODE_ENV === "development" ? "" : "/sap-btp-ai-best-practices";
};

export const getAssetPath = (path: string) => {
  const basePath = getBasePath();
  return `${basePath}${path}`;
};
