import { aleo } from "@/fonts";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/custom-agency.css";
import "./styles/global.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-bs-theme="light">
      <body className={aleo.className}>{children}</body>
    </html>
  );
}
