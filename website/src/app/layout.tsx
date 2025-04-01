import MainLayout from "@/components/MainLayout";
import { aleo } from "@/fonts";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import "./styles/sap-horizon-theme.css";
import "./styles/sap-theme-custom.css";

export async function generateMetadata() {
  return {
    metadataBase: new URL(process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://sap-samples.github.io/sap-btp-ai-best-practices/"),
    title: "SAP BTP AI Best Practices",
    description: "Your Ultimate Guide for Building AI Solutions on BTP",
    openGraph: {
      images: ["/images/icon-square.png"]
    },
    icons: {
      icon: [{ url: "/images/icon.png" }, { url: "/images/icon-square.png" }, { url: "/images/icon.svg" }],
      shortcut: "/images/icon-square.png",
      apple: "/images/icon-square.png"
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-bs-theme="light">
      <body className={aleo.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
