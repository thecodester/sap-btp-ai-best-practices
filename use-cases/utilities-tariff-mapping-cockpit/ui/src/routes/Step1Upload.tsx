import { UploadSection } from "@/components/UploadSection";
import { Bar, Page, Title } from "@ui5/webcomponents-react";

export default function Step1UploadPage() {
  return (
    <Page header={<Bar startContent={<Title>Upload Document</Title>} />}>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", alignItems: "flex-start", padding: "2rem 0" }}>
        <UploadSection />
      </div>
    </Page>
  );
}
