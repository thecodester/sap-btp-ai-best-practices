export const environment = {
  isDevelopment: process.env.NODE_ENV === "development",
  storageName: process.env.NODE_ENV === "development" ? "sap-btp-ai-best-practices-dev" : "sap-btp-ai-best-practices"
};
