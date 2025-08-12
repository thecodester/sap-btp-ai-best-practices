"use client";

import { Button, Card, CardHeader, FileUploader, FileUploaderDomRef, Text, TextArea, Ui5CustomEvent, BusyIndicator, Icon } from "@ui5/webcomponents-react";
import { FileUploaderChangeEventDetail } from "@ui5/webcomponents/dist/FileUploader";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProcessDocumentMutation } from "@/hooks/mutations";
import { useValidation } from "@/context/ValidationContext";
import { API_URL } from "@/lib/config";
import "@ui5/webcomponents-icons/dist/pdf-attachment.js";
import "@ui5/webcomponents-icons/dist/upload.js";

export function UploadSection() {
  const navigate = useNavigate();
  const { setGeneratedConfig } = useValidation();
  const sampleData = `Residential Service – Rate 10: For all domestic uses. Customer Charge: $8.00 per month. Energy Charge: First 500 kWh @ $0.08263 per kWh; Over 500 kWh @ $0.06503 per kWh. Fuel Cost Adjustment applies. Available to single-phase customers only. Applicable for standard residential service.`;
  const [text, setText] = useState("");
  const [isUploadingPDF, setIsUploadingPDF] = useState(false);

  const { data, error, isMutating, trigger } = useProcessDocumentMutation();

  useEffect(() => {
    if (data) {
      setGeneratedConfig(data.data);
      console.log("Processed tariff data:", JSON.stringify(data.data, null, 2));
      navigate("/validate/step2-config");
    }
    if (error) {
      alert(`Failed to process file: ${error.message}`);
    }
  }, [data, error, setGeneratedConfig, navigate]);

  const handleProcessFile = () => {
    trigger({ text });
  };

  const handleUploadFile = async (event: Ui5CustomEvent<FileUploaderDomRef, FileUploaderChangeEventDetail>) => {
    const file = event.detail.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Only PDF files are supported. Please select a PDF file.");
        return;
      }

      setIsUploadingPDF(true);
      try {
        const formData = new FormData();
        formData.append("pdf", file);

        const response = await fetch(`${API_URL}/processPDF`, {
          method: "POST",
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to process PDF");
        }

        const result = await response.json();
        console.log("PDF processing result:", result);

        if (result.data) {
          setGeneratedConfig(result.data);
          navigate("/validate/step2-config");
          return;
        }
        setIsUploadingPDF(false);
      } catch (error) {
        console.error("Error processing PDF:", error);
        alert(`Failed to process PDF: ${error instanceof Error ? error.message : "Unknown error"}`);
        setIsUploadingPDF(false);
      }
    }
  };

  const isLoading = isMutating || isUploadingPDF;

  return (
    <div>
      <Card header={<CardHeader titleText="Upload PDF Document" />}>
        <div style={{ padding: "1rem", position: "relative" }}>
          {isUploadingPDF && (
            <BusyIndicator
              active
              text="Processing PDF and extracting text..."
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                backgroundColor: "#fff",
                padding: "0.75rem"
              }}
            />
          )}
          <Text style={{ display: "block", marginBottom: "1rem" }}>Upload a PDF document containing tariff information for automatic text extraction and processing.</Text>
          <FileUploader accept=".pdf,application/pdf" onChange={handleUploadFile} disabled={isLoading} hideInput>
            <Button disabled={isLoading} icon="upload">
              {isUploadingPDF ? "Processing PDF..." : "Upload PDF File"}
            </Button>
          </FileUploader>

          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e0e0e0" }}>
            <Text style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.5rem", display: "block" }}>Try with sample files:</Text>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <Button design="Transparent" icon="pdf-attachment" onClick={() => window.open("/Residential Service – Rate 10 (RS-10).pdf", "_blank")}>
                Residential Service – Rate 10 (Small file)
              </Button>
              {/* <Button design="Transparent" icon="pdf-attachment" onClick={() => window.open("/General Service – Rate 20 (GS‑20).pdf", "_blank")}>
                General Service – Rate 20 (GS‑20)
              </Button> */}
              <Button design="Transparent" icon="pdf-attachment" onClick={() => window.open("/Riverview Tariff Book 2025.pdf", "_blank")}>
                Riverview Tariff Book 2025 (Large file)
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div style={{ textAlign: "center", margin: "1rem 0" }}>
        <Text style={{ fontSize: "1rem", fontWeight: "bold", color: "#666" }}>or</Text>
      </div>

      <Card header={<CardHeader titleText="Manual Text Entry" />}>
        <div style={{ padding: "1rem", position: "relative" }}>
          {isMutating && (
            <BusyIndicator active text="Analyzing text with AI..." style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1000 }} />
          )}

          <div style={{ marginBottom: "1rem" }}>
            <Text style={{ fontWeight: "bold", marginBottom: "0.5rem", display: "block" }}>Sample Tariff Text (click to copy):</Text>
            <div
              style={{
                padding: "0.75rem",
                backgroundColor: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "0.875rem",
                cursor: "pointer",
                marginBottom: "0.5rem"
              }}
              onClick={() => {
                navigator.clipboard.writeText(sampleData);
                alert("Sample text copied to clipboard!");
              }}
              title="Click to copy sample text"
            >
              {sampleData}
            </div>
          </div>

          <div style={{ marginBottom: "0.5rem" }}>
            <Text style={{ fontWeight: "bold", display: "block", marginBottom: "0.25rem" }}>Enter Tariff Text:</Text>
            <Text style={{ fontSize: "0.875rem", color: "#666", display: "block" }}>Enter your tariff text below, or use the sample text above to test the functionality.</Text>
          </div>

          <TextArea
            value={text}
            onInput={(e) => setText(e.target.value || "")}
            style={{ width: "100%", height: "150px", marginBottom: "1rem" }}
            disabled={isLoading}
            placeholder="Paste or type tariff text here..."
          />
          <Button onClick={handleProcessFile} style={{ width: "100%" }} disabled={isLoading || !text.trim()}>
            {isMutating ? "Processing Text..." : "Process Text and Proceed"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default UploadSection;
