import { useEffect } from "react";
import { trackEvent } from "./trackingUtils";

interface TrackingParams {
  toolName?: string;
  featureName: string;
}

/**
 * Hook for tracking page views
 */
export const useTracking = ({ toolName, featureName }: TrackingParams) => {
  useEffect(() => {
    trackEvent({ toolName, featureName });
  }, [toolName, featureName]);
};
