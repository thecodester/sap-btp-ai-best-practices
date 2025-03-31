"use client";

import { useTracking } from "@/lib/trackingTool/useTracking";
import "@sap_oss/automated-usage-tracking-tool/theme/sap_horizon.css";

const Landing = () => {
  useTracking({ featureName: "pv-landing" });

  return (
    <section id="landing" className="p-0">
      <h1>Landing</h1>
    </section>
  );
};

export default Landing;
