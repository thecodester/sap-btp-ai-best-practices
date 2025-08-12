import { useValidation } from "@/context/ValidationContext";
import { ConfigPreview } from "@/components/ConfigPreview";
import { ComplianceCheckPanel } from "@/components/ComplianceCheckPanel";
import { Card, CardHeader, Title, Button, MessageStrip, Page, Bar } from "@ui5/webcomponents-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Step2ConfigPage() {
  const { generatedConfig, setGeneratedConfig, isCompliant } = useValidation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Configuration approved and submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting configuration:", error);
      alert("Error submitting configuration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/validate/step1-upload");
  };

  if (!generatedConfig) {
    return (
      <div className="p-4">
        <MessageStrip design="Negative">No configuration data available. Please go back to upload a document first.</MessageStrip>
        <div className="mt-4">
          <Button onClick={handleBack}>Back to Upload</Button>
        </div>
      </div>
    );
  }

  return (
    <Page header={<Bar startContent={<Title level="H2">Validate Configuration</Title>} />}>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", alignItems: "flex-start", padding: "2rem 0" }}>
        <Card header={<CardHeader titleText="IS-U Configuration Validation" />}>
          <div style={{ padding: "0 1rem 1rem 1rem" }}>
            <p style={{ marginBottom: "1rem", paddingBottom: "1rem", color: "#666", borderBottom: "1px solid #e0e0e0" }}>
              Review the generated IS-U configuration below. Make any necessary edits and run compliance checks before final approval.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ gridColumn: "span 2" }}>
                <ConfigPreview
                  config={generatedConfig}
                  onConfigChange={(updatedConfig: any) => {
                    setGeneratedConfig(updatedConfig);
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e0e0e0" }}>
              <Button design="Transparent" onClick={handleBack}>
                Back to Upload
              </Button>

              <Button design="Emphasized" onClick={handleApprove} disabled={!isCompliant || isSubmitting}>
                {isSubmitting ? "Submitting..." : "Approve & Submit Configuration"}
              </Button>
            </div>
          </div>
        </Card>

        <Card style={{ maxWidth: "450px" }}>
          <ComplianceCheckPanel />
        </Card>
      </div>
    </Page>
  );
}
