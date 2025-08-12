import React, { useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";
import { useLocation } from "@docusaurus/router";
import { useAuth } from "@site/src/authProviderBTP";
import LoginWall from "@site/src/components/LoginWall";
import { trackEvent } from "@site/src/lib/trackingTool/trackingUtils";

/**
 * Redirect page to GitHub source code repositories.
 * - Expects a base64-encoded URL in the slug: /download-source-code/<base64>
 * - Forces login so we can associate the download intent to the user.
 * - After login, decodes URL, validates it, tracks intent, and redirects.
 */
export default function DownloadUseCaseSourceCode(): React.ReactNode {
  const location = useLocation();
  const { isLoggedIn, isLoading, login } = useAuth();

  const [error, setError] = useState<string | null>(null);

  // Clean up trailing '=' padding in slug to avoid issues during login redirects
  useEffect(() => {
    const path = location.pathname || "";
    const prefix = "/download-source-code/";
    if (path.startsWith(prefix) && path.length > prefix.length) {
      const slug = decodeURIComponent(path.slice(prefix.length));
      const cleaned = slug.replace(/=+$/, "");
      if (cleaned !== slug) {
        const newPath = prefix + encodeURIComponent(cleaned);
        const newUrl = newPath + (location.search || "") + (location.hash || "");
        window.history.replaceState(null, "", newUrl);
      }
    }
  }, [location.pathname, location.search, location.hash]);

  // Extract and decode the target URL from base64 embedded in the URL path: /download-source-code/<base64>
  const decodedUrl: string | null = useMemo(() => {
    const decodeBase64UrlSafe = (value: string): string | null => {
      try {
        let base64 = value.replace(/-/g, "+").replace(/_/g, "/");
        const padding = base64.length % 4;
        if (padding) base64 += "=".repeat(4 - padding);
        return atob(base64);
      } catch {
        return null;
      }
    };

    const path = location.pathname || "";
    const prefix = "/download-source-code/";
    if (path.startsWith(prefix) && path.length > prefix.length) {
      const encodedFromPath = decodeURIComponent(path.slice(prefix.length)).replace(/=+$/, "");
      const decodedFromPath = decodeBase64UrlSafe(encodedFromPath);
      if (decodedFromPath) return decodedFromPath;
    }

    return null;
  }, [location.pathname]);

  // Basic validation: only allow http(s) and specifically prefer GitHub links
  const isValidUrl = (urlStr: string | null): boolean => {
    if (!urlStr) return false;
    try {
      const url = new URL(urlStr);
      const protocolAllowed = url.protocol === "https:" || url.protocol === "http:";
      const isGithub = /(^|\.)github\.com$/i.test(url.hostname);
      return protocolAllowed && isGithub;
    } catch {
      return false;
    }
  };

  // If not logged in, trigger login only when destination is valid. Origin preserves the slug for post-login return
  useEffect(() => {
    if (isLoading || isLoggedIn) return;

    if (!isValidUrl(decodedUrl)) {
      setError("Invalid or missing destination.");
      return;
    }

    login();
  }, [isLoading, isLoggedIn, login, decodedUrl]);

  // After login, validate, track, and redirect
  useEffect(() => {
    const redirect = async () => {
      if (isLoading || !isLoggedIn) return;

      if (!isValidUrl(decodedUrl)) {
        setError("Invalid or missing destination.");
        return;
      }

      try {
        // Track the intent just before redirect
        await trackEvent({ featureName: `[trackable-link-redirect]:${decodedUrl}` });
      } catch (e) {
        // Non-blocking
      }

      window.location.replace(decodedUrl!);
    };

    redirect();
  }, [isLoading, isLoggedIn, decodedUrl]);

  return (
    <Layout title="Redirecting..." description="Redirecting to Source Code">
      <div style={{ maxWidth: 680, margin: "40px auto", textAlign: "center" }}>
        <h1>Redirecting...</h1>
        <p>Redirecting to Source Code</p>
      </div>
      {/* Minimal fallback content for cases where LoginWall is hidden */}
      {error && (
        <div style={{ maxWidth: 680, margin: "40px auto", padding: 16 }}>
          <p style={{ color: "var(--ifm-color-danger)" }}>{error}</p>
          <p>
            <a href="/">Go back to home</a>
          </p>
        </div>
      )}

      {/* Enforce login visually only when there's no error */}
      {!error && (
        <>
          <div style={{ height: "420px" }}></div>
          <LoginWall>
            <div />
          </LoginWall>
        </>
      )}
    </Layout>
  );
}
