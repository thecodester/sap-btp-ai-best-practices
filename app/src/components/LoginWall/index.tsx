import React, { type ReactNode } from "react";
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
  message = "Log in or create a free SAP account to unlock this exclusive content. Get started in moments!",
  title = "Unlock Exclusive Content",
  renderOnlyWhenLoggedIn = false
}) => {
  const { isLoggedIn, login, isLoading } = useAuth();
  const logoUrl = useBaseUrl("/img/logo.svg");

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
            <div className={styles.actionsContainer}>
              <button onClick={() => login()} className="button button--primary button--lg">
                <img src={logoUrl} alt="SAP Logo" /> Login with your SAP account
              </button>
              <div className={styles.orSeparator}>or</div>
              <a href="https://account.sap.com/register" target="_blank" className={styles.createAccountLink}>
                Create your free SAP account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWall;
