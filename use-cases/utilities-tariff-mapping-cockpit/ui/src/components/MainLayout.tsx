"use client";

import { AppShell } from "@/components/AppShell";
import { AppShellBar } from "@/components/AppShellBar";
import { StepNavigator } from "@/components/StepNavigator";
import { ReactNode } from "react";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateRows: "auto 1fr", height: "100vh" }}>
      <AppShellBar />
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", overflow: "hidden" }}>
        <StepNavigator />
        <AppShell>{children}</AppShell>
      </div>
    </div>
  );
}

export default MainLayout;
