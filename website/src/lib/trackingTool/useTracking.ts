import { environment } from "@/config/environment";
import SAPTrackingTool from "@sap_oss/automated-usage-tracking-tool";
import { useEffect } from "react";
import { TRACKING_CONFIG } from "./config";

interface TrackingParams {
  toolName?: string;
  featureName: string;
}

export const useTracking = ({ toolName, featureName }: TrackingParams) => {
  useEffect(() => {
    const initializeTracking = async () => {
      try {
        const trackingTool = new SAPTrackingTool({
          apiKey: TRACKING_CONFIG.apiKey,
          dataCenter: TRACKING_CONFIG.dataCenter,
          storageName: environment.storageName
        });

        await trackingTool.requestConsentConfirmation({
          message: TRACKING_CONFIG.consentMessage
        });

        trackingTool.trackUsage({
          featureName,
          toolName: toolName ?? TRACKING_CONFIG.toolName
        });
      } catch (error) {
        console.error("Failed to initialize tracking:", error);
      }
    };

    initializeTracking();
  }, [toolName, featureName]);
};
