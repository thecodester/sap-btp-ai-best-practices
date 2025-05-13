export const environment = {
  isDevelopment: process.env.NODE_ENV === "development",
  storageName: process.env.NODE_ENV === "development" ? "sap-btp-ai-bp-app-storage-dev" : "sap-btp-ai-bp-app-storage",
  tracking: {
    apiKey:
      process.env.NODE_ENV === "development"
        ? "4_CcpUxPlDDVz70o_rOpthMA" // Development API key
        : "4_CcpUxPlDDVz70o_rOpthMA" // Production API key (ToDo: Use 4_duOSO3z2qVND7NiKmJ7NJw)
  }
};
