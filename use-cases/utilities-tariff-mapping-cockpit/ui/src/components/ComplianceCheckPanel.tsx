"use client";

import { useValidation } from "@/context/ValidationContext";
import { List, ListItemStandard, Panel } from "@ui5/webcomponents-react";

export function ComplianceCheckPanel() {
  const { complianceChecks } = useValidation();

  return (
    <Panel headerText="Compliance Checks Summary" collapsed={false}>
      <List>
        {complianceChecks.map((check, index) => (
          <ListItemStandard key={index} additionalText={check.state} additionalTextState={check.state as any}>
            {check.text}
          </ListItemStandard>
        ))}
      </List>
    </Panel>
  );
}

export default ComplianceCheckPanel;
