import SAPTrackingTool from "@sap_oss/automated-usage-tracking-tool";
import "@sap_oss/automated-usage-tracking-tool/theme/sap_horizon.css";
import { environment } from "@site/src/config/environment";
import { TRACKING_CONFIG } from "./config";

interface TrackingParams {
  toolName?: string;
  featureName: string;
  skipConsent?: boolean;
  additionalData?: Record<string, any>;
}

/**
 * Shared tracking utility that can be used by both hooks and event handlers
 */
export const trackEvent = async ({ toolName = TRACKING_CONFIG.toolName, featureName, skipConsent = false, additionalData }: TrackingParams): Promise<void> => {
  // // Skip tracking in development mode
  // if (environment.isDevelopment) {
  //   console.log(`Tracking disabled in development mode. Would track: ${featureName}`);
  //   return;
  // }

  // Disable tracking for testing
  return;

  try {
    const trackingTool = new SAPTrackingTool({
      apiKey: TRACKING_CONFIG.apiKey,
      dataCenter: TRACKING_CONFIG.dataCenter,
      storageName: environment.storageName
    });

    // Request consent only if not skipped (for click events we can skip it)
    if (!skipConsent) {
      await trackingTool.requestConsentConfirmation({
        message: TRACKING_CONFIG.consentMessage
      });
    }

    trackingTool.trackUsage({
      featureName,
      toolName,
      ...(additionalData && { additionalData })
    });
  } catch (error) {
    console.error("Failed to track event:", error);
  }
};
