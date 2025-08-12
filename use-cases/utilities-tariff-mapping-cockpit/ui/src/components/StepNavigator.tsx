"use client";

import { SideNavigation, SideNavigationItem, SideNavigationPropTypes } from "@ui5/webcomponents-react";
import { useLocation, useNavigate } from "react-router-dom";
import uploadToCloudIcon from "@ui5/webcomponents-icons/dist/upload-to-cloud";
import settingsIcon from "@ui5/webcomponents-icons/dist/settings";
import classes from "./StepNavigator.module.css";

export function StepNavigator() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigation: SideNavigationPropTypes["onSelectionChange"] = (event) => {
    const path = (event.detail.item as HTMLElement).dataset.path;
    if (path) {
      navigate(path);
    }
  };

  return (
    <SideNavigation className={classes.sideNav} onSelectionChange={handleNavigation}>
      <SideNavigationItem text="1. Upload Document" selected={pathname === "/validate/step1-upload"} icon={uploadToCloudIcon} data-path="/validate/step1-upload" />
      <SideNavigationItem text="2. Validate Configuration" selected={pathname === "/validate/step2-config"} icon={settingsIcon} data-path="/validate/step2-config" />
    </SideNavigation>
  );
}

export default StepNavigator;
