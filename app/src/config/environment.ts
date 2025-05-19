export const environment = {
  isDevelopment: process.env.NODE_ENV === "development",
  storageName: process.env.NODE_ENV === "development" ? "sap-btp-ai-bp-app-storage-dev" : "sap-btp-ai-bp-app-storage",
  tracking: {
    apiKey:
      process.env.NODE_ENV === "development"
        ? "4_CcpUxPlDDVz70o_rOpthMA" // Development API key
        : "4_duOSO3z2qVND7NiKmJ7NJw" // Production API key
  },
  // Local URL: http://localhost:4004
  // QA URL: https://btp-ai-best-practices-qa-qa-btp-ai-best-practices-srv.cfapps.eu10-005.hana.ondemand.com
  // PROD URL: https://btp-ai-best-practices-prod-prod-btp-ai-best-practices-srv.cfapps.eu10-005.hana.ondemand.com
  apiUrl: process.env.NODE_ENV === "development" ? "http://localhost:4004" : "https://btp-ai-best-practices-prod-prod-btp-ai-best-practices-srv.cfapps.eu10-005.hana.ondemand.com"
};
