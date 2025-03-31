import { aleo } from "@/fonts";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/custom-agency.css";
import "./styles/global.css";

export const metadata = {
  metadataBase: new URL("https://sap-samples.github.io/sap-btp-ai-best-practices/"),
  title: "SAP BTP AI Best Practices",
  description: "Your Ultimate Guide for Building AI Solutions on BTP",
  openGraph: {
    images: "/images/icon-square.png"
  },
  icons: {
    icon: "/images/icon-square.png",
    shortcut: "/images/icon-square.png",
    apple: "/images/icon-square.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-bs-theme="light">
      <body className={aleo.className}>{children}</body>
    </html>
  );
}
