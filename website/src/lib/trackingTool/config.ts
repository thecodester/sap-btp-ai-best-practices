export const TRACKING_CONFIG = {
  toolName: "sap-btp-ai-best-practices-website",
  dataCenter: "eu1",
  apiKey: "4_CcpUxPlDDVz70o_rOpthMA",
  consentMessage:
    "This website collects anonymous usage data to enhance the product experience. By using this website, you consent to the collection and sharing of this data with SAP. Do you wish to continue?"
} as const;

export const TRACKING_EVENTS = {
  PAGE_VIEW: {
    ABOUT: "pv-about",
    LANDING: "pv-landing"
    // Add other page view events here
  }
} as const;
