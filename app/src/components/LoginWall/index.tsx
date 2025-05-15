import React, { type ReactNode, useState } from "react";
import { useAuth } from "@site/src/authProviderBTP"; // Adjust path if necessary
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

interface LoginWallProps {
  children: ReactNode;
  message?: string;
  title?: string;
  renderOnlyWhenLoggedIn?: boolean;
}

const LoginWall: React.FC<LoginWallProps> = ({
  children,
  message = "Log in or create a free SAP account to unlock this content. Get started in moments!",
  title = "Unlock Free Content",
  renderOnlyWhenLoggedIn = false
}) => {
  const { isLoggedIn, login, isLoading } = useAuth();
  const logoUrl = useBaseUrl("/img/logo.svg");
  const privacyUrl = useBaseUrl("/privacy");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);

  const handleLogin = () => {
    // if (!termsAccepted) {
    //   setShowTermsError(true);
    //   return;
    // }

    setShowTermsError(false);
    login();
  };

  if (isLoading) {
    return null;
  }

  if (isLoggedIn) {
    return <>{children}</>;
  }

  if (renderOnlyWhenLoggedIn) {
    return null;
  }

  return (
    <div className={styles.loginWallContainer}>
      {/* <div className={styles.fadedContent}>{children}</div> */}
      <div className={styles.loginWallOverlay}>
        <div className={styles.loginWallPopup}>
          <div className={styles.headerContainer}>Login or create a free SAP account</div>
          <div className={styles.contentContainer}>
            <h2>{title}</h2>
            <p>{message}</p>
          </div>
          {/* <div className={styles.divider}></div> */}
          <div className={styles.actionsWrapper} style={{ marginTop: "-10px", paddingTop: "0" }}>
            {/* <div className={styles.termsContainer}>
              <label className={`${styles.termsLabel} ${showTermsError ? styles.termsError : ""}`}>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    if (e.target.checked) setShowTermsError(false);
                  }}
                  required
                  className={showTermsError ? styles.inputError : ""}
                />
                <span>
                  I have read and understand the Terms and Conditions of the SAP BTP AI Best Practices <span className={styles.required}>*</span>
                </span>
              </label>
              <p className={styles.termsText}>
                By clicking "Login with your SAP account", you agree to SAP BTP AI Best Practices' terms. You can learn about how SAP BTP AI Best Practices collects, uses, and
                shares data in the{" "}
                <a href="https://sap-samples.github.io/sap-btp-ai-best-practices/privacy" target="_blank" rel="noopener noreferrer">
                  SAP BTP AI Best Practices' Privacy Statement
                </a>
                .
              </p>
            </div> */}

            <button onClick={handleLogin} className="button button--primary button--lg">
              <img src={logoUrl} alt="SAP Logo" /> Login with your SAP account
            </button>
            {showTermsError && <p className={styles.errorMessage}>You must accept the terms and conditions to continue.</p>}

            <p className={styles.termsText} style={{ marginBottom: "0", textAlign: "center" }}>
              By clicking "Login with your SAP account", you agree to SAP BTP AI Best Practices' terms. You can learn about how SAP BTP AI Best Practices collects, uses, and shares
              data in the{" "}
              <a href={privacyUrl} target="_blank" rel="noopener noreferrer">
                SAP BTP AI Best Practices' Privacy Statement
              </a>
              .
            </p>

            <div className={styles.orSeparator}>or</div>
            <a href="https://account.sap.com/register" target="_blank" className={styles.createAccountLink}>
              Create your free SAP account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWall;
