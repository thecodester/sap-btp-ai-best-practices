"use client";

import { TRACKING_EVENTS } from "@/lib/trackingTool/config";
import { useTracking } from "@/lib/trackingTool/useTracking";

interface PageViewTrackerProps {
  featureName: keyof typeof TRACKING_EVENTS.PAGE_VIEW;
}

export default function PageViewTracker({ featureName }: PageViewTrackerProps) {
  useTracking({ featureName: TRACKING_EVENTS.PAGE_VIEW[featureName] });
  return null;
}
