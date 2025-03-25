"use client";

import { useLocale, useTranslations } from "next-intl";

import TrackingTool from "@sap_oss/automated-usage-tracking-tool";
import "@sap_oss/automated-usage-tracking-tool/theme/sap_horizon.css";
import { useEffect } from "react";

const Landing = () => {
  const t = useTranslations("Landing");
  const locale = useLocale();

  useEffect(() => {
    const initializeTracking = async () => {
      console.log("here");

      const trackingTool = new TrackingTool({
        apiKey: "4_3OulQC05sfcJ-D5mG6aMNg",
        dataCenter: "eu1"
      });

      const res = await trackingTool.requestConsentConfirmation();
      console.log({ res });

      trackingTool.trackUsage({
        toolName: "test-website",
        featureName: "page-view-landing"
      });

      console.log("trackingTool.isConsentGranted()", trackingTool.isConsentGranted());
    };

    initializeTracking();
  }, []);

  return (
    <section id="landing" className="p-0">
      <div className="container logo-container text-center">
        <h1>SAP BTP AI Best Practices</h1>
      </div>
    </section>
  );
};

export default Landing;
