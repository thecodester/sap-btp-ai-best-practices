import SAPTrackingTool from "@site/src/lib/trackingTool/automated-usage-tracking-tool/web";
import { InMemoryTrackingStorage } from "./InMemoryTrackingStorage";

import { environment } from "@site/src/config/environment";
import { TRACKING_CONFIG } from "./config";
import { authStorage } from "@site/src/utils/authStorage";

// Create and export a singleton tracking tool instance
export const trackingTool = new SAPTrackingTool({
  apiKey: TRACKING_CONFIG.apiKey,
  dataCenter: TRACKING_CONFIG.dataCenter,
  storageName: environment.storageName
});

declare global {
  interface Window {
    SAP?: {
      global: {
        trustArc: {
          domain: string;
        };
      };
    };
    isConsentEnabled: (domain: string, level: number) => boolean;
  }
}

interface TrackingParams {
  toolName?: string;
  featureName: string;
}

const hasConsentLevel = () => {
  if (!window.SAP?.global?.trustArc?.domain || !window.isConsentEnabled) {
    console.error("window.SAP.global.trustArc.domain or window.isConsentEnabled is not set");
    return false;
  }

  if (window.isConsentEnabled(`${window.SAP.global.trustArc.domain}`, 1) || window.isConsentEnabled(`${window.SAP.global.trustArc.domain}`, 2)) {
    return true;
  }

  return false;
};

/**
 * Shared tracking utility that can be used by both hooks and event handlers
 */
export const trackEvent = async ({ toolName = TRACKING_CONFIG.toolName, featureName = window.location.pathname }: TrackingParams): Promise<void> => {
  const authData = authStorage.load();
  const hasUserConsent = hasConsentLevel();
  // const hasUserConsent = false;
  console.log("hasConsentLevel", hasUserConsent);

  // If not consent to track cookies, track usage in memory and create a new CDC lite user for each session
  // If the user is logged in, use the user's email in a "data" field to connect the "session user" to the logged in user
  if (!hasUserConsent) {
    // Track usage in memory for the current session
    const memoryStorage = InMemoryTrackingStorage.getInstance();
    memoryStorage.addUsage(toolName, featureName);

    trackingTool.customTrackUsage({
      toolName,
      featureName,
      email: `${memoryStorage.getSessionId()}@session.btp-ai-bp.docs.sap`,
      usages: memoryStorage.getUsages(),
      // If the user is logged in, use the user's email in a "data" field to connect the "session user" to the logged in user
      ...(authData?.email && { additionalData: { userEmail: authData.email } })
    });
    return;
  }

  // If consent to track cookies, track usage in the tracking tool and use the user's email as the "session email"
  const email = authData?.email || trackingTool.storage.getEmail() || `${crypto.randomUUID()}@anonymous.btp-ai-bp.docs.sap`;

  // If e-mail is different than the current e-mail, clear the tracking tool storage and set the new e-mail
  if (email !== trackingTool.storage.getEmail()) {
    trackingTool.storage.clear();
    trackingTool.storage.setEmail(email);
  }

  trackingTool.storage.setLatestUsage(toolName, featureName);
  trackingTool.customTrackUsage({
    toolName,
    featureName,
    email,
    usages: trackingTool.storage.getLatestUsages()
  });
};

/**
 * Clears the in-memory tracking storage
 */
export const clear = (): void => {
  InMemoryTrackingStorage.getInstance().clear();
  trackingTool.storage.clear();
};
