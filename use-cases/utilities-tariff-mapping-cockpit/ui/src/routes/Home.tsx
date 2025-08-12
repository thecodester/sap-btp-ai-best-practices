import { Button, Card, CardHeader, Page, Title, Text } from "@ui5/webcomponents-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleStartValidationClick = () => {
    navigate("/validate/step1-upload");
  };

  return (
    <Page>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", boxSizing: "border-box" }}>
        <Title level="H3" wrappingType="Normal" style={{ textAlign: "center", color: "var(--sapNeutralTextColor)", marginBottom: "2rem" }}>
          Accelerate your document processing with AI-powered data extraction and IS-U configuration.
        </Title>

        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "3rem" }}>
          <Card header={<CardHeader titleText="Automated Data Extraction" />}>
            <div style={{ padding: "1rem", maxWidth: "300px" }}>
              <Text>Ingests and parses complex regulatory documents (PDFs) using NLP to identify key billing components and rules.</Text>
            </div>
          </Card>
          <Card header={<CardHeader titleText="Analyst-in-the-Loop UI" />}>
            <div style={{ padding: "1rem", maxWidth: "300px" }}>
              <Text>Presents extracted data in a user-friendly interface for validation, correction, and final approval before system integration.</Text>
            </div>
          </Card>
          <Card header={<CardHeader titleText="Seamless IS-U Integration" />}>
            <div style={{ padding: "1rem", maxWidth: "300px" }}>
              <Text>Maps validated entities directly to SAP IS-U structures like operands and price keys, ready for automated configuration.</Text>
            </div>
          </Card>
        </div>

        <Button design="Emphasized" onClick={handleStartValidationClick} style={{ minWidth: "200px" }}>
          Get Started
        </Button>
      </div>
    </Page>
  );
}
