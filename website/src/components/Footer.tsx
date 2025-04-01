import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer footer--dark" data-landmark-index="4">
      <div className="container container-fluid">
        <div className="row footer__links">
          <div className="col footer__col">
            <div className="footer__title">Community</div>
            <ul className="footer__items clean-list">
              <li className="footer__item">
                <a href="https://github.com/SAP-samples/sap-btp-ai-best-practices" target="_blank" rel="noopener noreferrer" className="footer__link-item">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div className="col footer__col">
            <div className="footer__title">Docs</div>
            <ul className="footer__items clean-list">
              <li className="footer__item">
                <a className="footer__link-item" href="#todo">
                  Documentation
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link-item" href="#todo">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="col footer__col">
            <div className="footer__title">Legal & Privacy</div>
            <ul className="footer__items clean-list">
              <li className="footer__item">
                <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="footer__link-item">
                  Privacy
                  <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" className="iconExternalLink_awgD">
                    <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path>
                  </svg>
                </Link>
              </li>
              <li className="footer__item">
                <a href="https://www.sap.com/impressum" target="_blank" rel="noopener noreferrer" className="footer__link-item">
                  Legal Disclosure
                  <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" className="iconExternalLink_awgD">
                    <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path>
                  </svg>
                </a>
              </li>
              <li className="footer__item">
                <a href="https://www.sap.com/terms-of-use" target="_blank" rel="noopener noreferrer" className="footer__link-item">
                  Terms of Use
                  <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" className="iconExternalLink_awgD">
                    <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path>
                  </svg>
                </a>
              </li>
              <li className="footer__item">
                <a href="https://www.sap.com/trademark" target="_blank" rel="noopener noreferrer" className="footer__link-item">
                  Trademark
                  <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" className="iconExternalLink_awgD">
                    <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="col footer__col">
            <div className="footer__title">Contact Us</div>
            <ul className="footer__items clean-list">
              <li className="footer__item">
                <a href="https://github.com/SAP-samples/sap-btp-ai-best-practices/issues/new" target="_blank" rel="noopener noreferrer" className="footer__link-item">
                  Report Issue
                </a>
              </li>
              <li className="footer__item">
                <a href="mailto:btp_ai_bp@sap.com?subject=[SAP BTP AI Best Practices]" target="_blank" rel="noopener noreferrer" className="footer__link-item">
                  Questions
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom text--center">
          <div className="margin-bottom--sm">
            <Image src="/images/sap-dark.svg" alt="SAP Logo" className="footer__logo themedComponent_DHUr themedComponent--light_DIHH" width={160} height={51} />
          </div>
          <div className="footer__copyright">© Copyright {new Date().getFullYear()}, SAP SE and SAP BTP AI Best Practices Contributors</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
