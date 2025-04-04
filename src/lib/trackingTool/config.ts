import { environment } from "@site/src/config/environment";

export const TRACKING_CONFIG = {
  toolName: "sap-btp-ai-best-practices-website",
  dataCenter: "eu1",
  apiKey: environment.tracking.apiKey,
  consentMessage: "We collect anonymous data to improve your experience on this site. Continue?"
} as const;

export const TRACKING_EVENTS = {
  PAGE_VIEW: {
    ABOUT: "pv-about",
    HOME: "pv-home",
    INTRO: "pv-intro-docusaurus"
    // Add other page view events here
  }
} as const;
