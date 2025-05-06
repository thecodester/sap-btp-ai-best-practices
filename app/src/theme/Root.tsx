import React from "react";
import { AuthProvider } from "@site/src/authProviderBTP"; // Corrected path

// Default implementation, that you can customize
// https://docusaurus.io/docs/swizzling#wrapping-global-components
export default function Root({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
