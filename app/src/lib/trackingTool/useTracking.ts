import { useEffect } from "react";
import { trackEvent } from "./trackingUtils";
import { useAuth } from "@site/src/authProviderBTP";
interface TrackingParams {
  toolName?: string;
  featureName: string;
}

/**
 * Hook for tracking page views
 * - For non-logged in users: tracks immediately
 * - For logged in users: waits for loading to complete to get email
 */
export const useTracking = ({ toolName, featureName }: TrackingParams) => {
  const { isLoggedIn, isLoading, token } = useAuth();

  useEffect(() => {
    // Add delay to ensure we don't track duplicate events before the user "isLoading" is started
    const timeoutId = setTimeout(() => {
      // If user is not logged in, track immediately
      if (!isLoggedIn && !token) {
        trackEvent({ toolName, featureName });
        return;
      }

      // If user is logged in, wait for loading to complete
      if (isLoggedIn && !isLoading) {
        trackEvent({ toolName, featureName });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [toolName, featureName, isLoggedIn, isLoading, token]);
};
