"use client";

import { TRACKING_EVENTS } from "@site/src/lib/trackingTool/config";
import { useTracking } from "@site/src/lib/trackingTool/useTracking";

interface PageViewTrackerProps {
  featureName?: keyof typeof TRACKING_EVENTS.PAGE_VIEW;
}

export default function PageViewTracker({ featureName }: PageViewTrackerProps) {
  useTracking({ featureName: featureName ? TRACKING_EVENTS.PAGE_VIEW[featureName] : undefined });
  return null;
}
